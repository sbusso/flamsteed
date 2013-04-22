// Generated by CoffeeScript 1.3.3
(function() {

  window.Flamsteed = (function() {

    Flamsteed.prototype.url = "http://localhost:9876";

    Flamsteed.prototype.log_max_size = 10;

    Flamsteed.prototype.log_min_size = 3;

    Flamsteed.prototype.log_max_interval = 1500;

    Flamsteed.prototype.flush_immediately = true;

    function Flamsteed(options) {
      if (options == null) {
        options = {};
      }
      this.setOptions(options);
      this.init;
    }

    Flamsteed.prototype.setOptions = function(options) {
      this.url = options.url || this.url;
      this.log_max_interval = options.log_max_interval || this.log_max_interval;
      this.log_min_size = options.log_min_size || this.log_min_size;
      this.log_max_size = options.log_max_size || this.log_max_size;
      return this.flush_immediately = options.flush_immediately || this.flush_immediately;
    };

    Flamsteed.prototype.log = function(data) {
      this.buffer.push(data);
      if (this.flush_immediately && this.buffer.length >= this.log_max_size) {
        return this.flush;
      }
    };

    Flamsteed.prototype.flushIfEnough = function() {
      if (this.buffer.length >= this.log_min_size) {
        return this.flush;
      }
    };

    Flamsteed.prototype.flush = function() {
      if (!this.flushing) {
        this.flushing = true;
        this.resetTimer;
        this.sendData(this.buffer);
        this.emptyBuffer;
        return this.flushing = false;
      }
    };

    Flamsteed.prototype.sendData = function(data) {
      var xhr;
      if (data.length > 0) {
        xhr = new XMLHttpRequest();
        return xhr.send(this.url, JSON.stringify(data));
      }
    };

    Flamsteed.prototype.resetTimer = function() {
      var f,
        _this = this;
      clearInterval(this.interval);
      clearTimeout(this.timeout);
      f = function() {
        return _this.interval = setInterval((function() {
          return _this.flushIfEnough;
        })(), _this.log_max_interval);
      };
      return this.timeout = setTimeout((function() {
        return f;
      })(), this.log_max_interval);
    };

    Flamsteed.prototype.emptyBuffer = function() {
      return this.buffer = [];
    };

    Flamsteed.prototype.init = function() {
      this.emptyBuffer;
      console.log(this.buffer);
      return this.resetTimer;
    };

    return Flamsteed;

  })();

}).call(this);
