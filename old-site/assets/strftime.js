/// strftime
/// https://github.com/samsonjs/strftime
/// @_sjs
///
/// Copyright 2010 - 2011 Sami Samhuri <sami.samhuri@gmail.com>
/// MIT License

;(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  if (typeof exports !== 'undefined') {
    namespace = exports;
  }

  // Browsers and other environments
  else {
    // Get the global object. Works in ES3, ES5, and ES5 strict mode.
    namespace = (function(){ return this || (1,eval)('this') }());
  }

  namespace.strftime = strftime;
  namespace.strftimeUTC = strftimeUTC;
  namespace.localizedStrftime = localizedStrftime;
  namespace.getLocalizedStrftime = function(locale) {
    console.log('[strftime] DEPRECATION NOTICE: getLocalizedStrftime is deprecated, use localizedStrftime instead');
    return (namespace.getLocalizedStrftime = localizedStrftime)(locale);
  };
  ////

  function words(s) { return (s || '').split(' '); }

  var DefaultLocale =
  { days: words('Sunday Monday Tuesday Wednesday Thursday Friday Saturday')
  , shortDays: words('Sun Mon Tue Wed Thu Fri Sat')
  , months: words('January February March April May June July August September October November December')
  , shortMonths: words('Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec')
  , AM: 'AM'
  , PM: 'PM'
  }

  function strftime(fmt, d, locale) {
    return _strftime(fmt, d, locale, false);
  }

  function strftimeUTC(fmt, d, locale) {
    return _strftime(fmt, d, locale, true);
  }

  function localizedStrftime(locale) {
    return function(fmt, d) {
      return strftime(fmt, d, locale);
    };
  }

  // locale is an object with the same structure as DefaultLocale
  function _strftime(fmt, d, locale, _useUTC) {
    // d and locale are optional so check if d is really the locale
    if (d && !(d instanceof Date)) {
      locale = d;
      d = undefined;
    }
    d = d || new Date();
    locale = locale || DefaultLocale;
    locale.formats = locale.formats || {};
    var msDelta = 0;
    if (_useUTC) {
      msDelta = (d.getTimezoneOffset() || 0) * 60000;
      d = new Date(d.getTime() + msDelta);
    }

    // Most of the specifiers supported by C's strftime, and one from Ruby (%L)
    return fmt.replace(/%(.)/g, function(_, c) {
      switch (c) {
        case 'A': return locale.days[d.getDay()];
        case 'a': return locale.shortDays[d.getDay()];
        case 'B': return locale.months[d.getMonth()];
        case 'b': // fall through
        case 'h': return locale.shortMonths[d.getMonth()];
        case 'D': return _strftime(locale.formats.D || '%m/%d/%y', d, locale);
        case 'd': return pad(d.getDate());
        case 'e': return d.getDate();
        case 'F': return _strftime(locale.formats.F || '%Y-%m-%d', d, locale);
        case 'H': return pad(d.getHours());
        case 'I': return pad(hours12(d));
        case 'k': return pad(d.getHours(), ' ');
        case 'L': return pad(Math.floor(d.getTime() % 1000), 3);
        case 'l': return pad(hours12(d), ' ');
        case 'M': return pad(d.getMinutes());
        case 'm': return pad(d.getMonth() + 1);
        case 'n': return '\n';
        case 'p': return d.getHours() < 12 ? locale.AM : locale.PM;
        case 'R': return _strftime(locale.formats.R || '%H:%M', d, locale);
        case 'r': return _strftime(locale.formats.r || '%I:%M:%S %p', d, locale);
        case 'S': return pad(d.getSeconds());
        case 's': return Math.floor((d.getTime() - msDelta) / 1000);
        case 'T': return _strftime(locale.formats.T || '%H:%M:%S', d, locale);
        case 't': return '\t';
        case 'u':
          var day = d.getDay();
          return day == 0 ? 7 : day; // 1 - 7, Monday is first day of the week
        case 'v': return _strftime(locale.formats.v || '%e-%b-%Y', d, locale);
        case 'w': return d.getDay(); // 0 - 6, Sunday is first day of the week
        case 'Y': return d.getFullYear();
        case 'y':
          var y = String(d.getFullYear());
          return y.slice(y.length - 2);
        case 'Z':
          if (_useUTC) {
            return "GMT";
          }
          else {
            var tz = d.toString().match(/\((\w+)\)/);
            return tz && tz[1] || '';
          }
        case 'z':
          if (_useUTC) {
            return "+0000";
          }
          else {
            var off = d.getTimezoneOffset();
            return (off < 0 ? '+' : '-') + pad(off / 60) + pad(off % 60);
          }
        default: return c;
      }
    });
  }

  // Default padding is '0' and default length is 2, both are optional.
  function pad(n, padding, length) {

    // pad(n, <length>)
    if (typeof padding === 'number') {
      length = padding;
      padding = '0';
    }

    // Defaults handle pad(n) and pad(n, <padding>)
    padding = padding || '0';
    length = length || 2;

    var s = String(n);
    while (s.length < length) s = padding + s;
    return s;
  }

  function hours12(d) {
    var hour = d.getHours();
    if (hour == 0) hour = 12;
    else if (hour > 12) hour -= 12;
    return hour;
  }

}());