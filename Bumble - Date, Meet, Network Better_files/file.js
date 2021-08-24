"use strict";
function testWepP() {
  var e = new Image();
  (e.src =
    "data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"),
    (e.onload = e.onerror =
      function () {
        Bumble.setImageQuality(e.height > 0);
      });
}
function sendEvent(e, t, i) {
  ga("send", "event", { eventCategory: e, eventAction: t, eventLabel: i });
}
function sendAction(e) {
  ga("send", e);
}
function AppInit() {
  var e = {},
    t,
    i,
    a,
    s;
  (Bumble.setImageQuality = function (e) {
    function t(t) {
      var i,
        a,
        s =
          t.clientWidth * window.devicePixelRatio > 1280
            ? "data-image-highres"
            : "data-image-normal";
      return e && (s = "data-image-webp"), t.getAttribute(s);
    }
    function i(e) {
      var i;
      document.querySelectorAll(e).forEach(function (e) {
        e.style.backgroundImage = "url(" + t(e) + ")";
      });
    }
    function a(e) {
      var i;
      document.querySelectorAll(e).forEach(function (e) {
        e.src = t(e);
      });
    }
    var s;
    i(".js-hero-image, .js-promo-image, .js-card-image"),
      a(".js-feature-image"),
      document.querySelectorAll(".js-instagram-image").forEach(function (e) {
        var t,
          i,
          a =
            e.clientWidth * window.devicePixelRatio > 360
              ? "s720x720"
              : "s360x360";
        e.src = e.src.replace(/s320x320/, a);
      });
  }),
    (t = $(document.documentElement)),
    (i = navigator.userAgent),
    ((a = {}).ipad = !!i.match(/(iPad).*OS\s([\d_]+)/)),
    (a.iphone = !a.ipad && !!i.match(/(iPhone\sOS)\s([\d_]+)/)),
    (a.ios = a.ipad || a.iphone),
    (a.android =
      !!i.match(/(Android)\s+([\d.]+)/) || !!i.match(/Silk-Accelerated/)),
    a.ios &&
      (t.addClass("ios"),
      9 === a.version && t.addClass("ios9"),
      a.version >= 9
        ? t.addClass("ios-font-sanfrancisco")
        : t.addClass("ios-font-helvetica")),
    a.android &&
      (t.addClass("android"),
      a.version >= 5
        ? t.addClass("android-font-roboto-new")
        : t.addClass("android-font-system")),
    a.windowsPhone &&
      (t.addClass("windows"),
      a.windowsPhone10
        ? t.addClass("windows10")
        : t.addClass("old-windows-ie")),
    a.bb10 && t.addClass("bb10"),
    (/MSIE 9/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent)) &&
      document.body.classList.add("ie11"),
    /Edge\/\d./i.test(navigator.userAgent) &&
      document.body.classList.add("edge"),
    (s = document.querySelector(".js-slider")) &&
      new Swiper(s, {
        speed: 600,
        wrapperClass: "js-slider-inner",
        slideClass: "js-slider-item",
        direction: "horizontal",
        pagination: {
          el: ".js-slider-pagination",
          modifierClass: "pagination__",
          bulletClass: "pagination__item",
          bulletActiveClass: "is-active",
          clickable: !0,
          clickableClass: "js-is-clickable",
          renderBullet: function (e, t) {
            return (
              '<span class="' + t + '" tabindex="-1" role="button"></span>'
            );
          },
        },
        navigation: {
          nextEl: ".js-slider-button-next",
          prevEl: ".js-slider-button-prev",
        },
        effect: "coverflow",
        loop: !0,
      }),
    (function () {
      function e(e) {
        var t = {};
        (t.id = "#" + e.substring(1)),
          (t.defaultId = "#question1"),
          (t.id = "#" !== t.id ? t.id : t.defaultId),
          (t.el = document.querySelector(t.id)),
          t.el &&
            (t.el.classList.add("is-active"),
            setTimeout(function () {
              (t.verticalPosition = t.el.getBoundingClientRect().top),
                window.scrollBy(0, t.verticalPosition);
            }, 400));
      }
      document.querySelectorAll(".js-question").forEach(function (e) {
        e.querySelector(".js-question-title").addEventListener(
          "click",
          function (t) {
            t.preventDefault(), e.classList.toggle("is-active");
          }
        );
      }),
        window.addEventListener("DOMContentLoaded", function () {
          e(location.hash);
        }),
        window.addEventListener("hashchange", function () {
          e(location.hash);
        });
    })(),
    (Bumble.ContentTriggers = function (e, t) {
      (this.$triggers = e.querySelectorAll(".js-content-trigger")),
        this.$triggers.length &&
          ((this.hideErrors = t),
          (this.$wrapper = e),
          this.init.apply(this, arguments));
    }),
    (Bumble.ContentTriggers.prototype = {
      init: function () {
        this.setElements(), this.setEvents();
      },
      setElements: function () {
        var e;
        (this.groups = {}),
          (this.$submit = this.$wrapper.querySelector(
            "[data-content-group-submit]"
          )),
          this.$wrapper.querySelectorAll("[data-content-group]").forEach(
            function (e) {
              var t = e.dataset.contentGroup,
                i = e.dataset.step;
              void 0 === this.groups[t] && (this.groups[t] = {}),
                (this.groups[t][i] = e),
                this.disableInputs(e, !0);
            }.bind(this)
          );
      },
      setEvents: function () {
        this.$triggers.forEach(
          function (e) {
            e.addEventListener(
              "click",
              function (e) {
                var t = e.target.dataset.targetGroup,
                  i = e.target.dataset.targetStep,
                  a = this.groups[t][i];
                this.openContent(a);
              }.bind(this)
            );
          }.bind(this)
        );
      },
      toggleSubmitContainer: function (e) {
        this.$submit.classList.toggle("is-hidden", e);
      },
      openContent: function (e) {
        e.classList.remove("is-hidden");
        var t = !e.dataset.showSubmit;
        this.toggleSubmitContainer(t),
          this.disableInputs(e, !1),
          this.closeOthers(e),
          this.hideErrors();
      },
      closeOthers: function (e) {
        var t = e.dataset.contentGroup,
          i = e.dataset.step,
          a = e.dataset.substep;
        for (var s in this.groups) {
          var n = this.groups[s];
          for (var r in n) {
            var o = n[r],
              l = !0;
            o.dataset.substep && (l = !1),
              o.dataset.substep === a && (l = !0),
              o.dataset.step < i && (l = !1),
              o.classList.contains("is-hidden") && (l = !1),
              o.dataset.contentGroup === t && o.dataset.step === i && (l = !1),
              l && (o.classList.add("is-hidden"), this.disableInputs(o, !0));
          }
        }
      },
      disableInputs: function (e, t) {
        if (e._disabled !== t) {
          var i = e.getElementsByTagName("input");
          if (i.length) {
            var a = 0;
            for (a = 0; a < i.length; a++) i[a].disabled = t;
          }
          var s = e.getElementsByTagName("textarea");
          if (s.length) {
            var a = 0;
            for (a = 0; a < s.length; a++) s[a].disabled = t;
          }
          e._disabled = t;
        }
      },
    }),
    (Bumble.Select = function (e) {
      if (((this.$wrapper = e), this.$wrapper))
        return this.init.apply(this, arguments);
    }),
    (Bumble.Select.prototype = {
      _additionalMargin: 20,
      _defaultHeight: 280,
      _openTopDirectionClassName: "dropdown-list--top",
      init: function () {
        this.setElements(), this.setEvents(), this.setOpenDirection();
      },
      setOpenDirection: function () {
        var e = parseInt(window.getComputedStyle(this.$wrapper).height, 10),
          t = parseInt(window.getComputedStyle(this.$dropdown).height, 10);
        t += this._additionalMargin + e;
        var i = this.$wrapper.getBoundingClientRect(),
          a = document.documentElement.scrollTop,
          s = i.top + a,
          n = document.body,
          r = document.documentElement,
          o;
        s + t >=
        Math.max(
          n.scrollHeight,
          n.offsetHeight,
          r.clientHeight,
          r.scrollHeight,
          r.offsetHeight
        )
          ? this.$dropdown.classList.add(this._openTopDirectionClassName)
          : this.$dropdown.classList.remove(this._openTopDirectionClassName);
      },
      setElements: function () {
        (this.$options = this.$wrapper.querySelectorAll(".js-select-option")),
          (this.$label = this.$wrapper.querySelector(".js-select-label")),
          (this.$input = this.$wrapper.querySelector(".js-select-input")),
          (this.$dropdown = this.$wrapper.querySelector(".js-dropdown-list"));
      },
      setEvents: function () {
        this.$wrapper.addEventListener("click", this.setOpened.bind(this, !0)),
          this.$wrapper.addEventListener(
            "mouseleave",
            this.setOpened.bind(this, !1)
          );
        for (var e = 0; e < this.$options.length; e++) {
          var t;
          this.$options[e].addEventListener(
            "click",
            function (e) {
              e.stopPropagation(), this.handleOptionClick(e.target);
            }.bind(this)
          );
        }
      },
      setOpened: function (e) {
        e
          ? this.$wrapper.classList.add("is-active")
          : this.$wrapper.classList.remove("is-active");
      },
      handleOptionClick: function (e) {
        e.classList.add("is-active"),
          this.$currentOption &&
            this.$currentOption.classList.remove("is-active"),
          (this.$currentOption = e),
          (this.$label.innerHTML = e.dataset.label),
          (this.$input.value = e.dataset.value),
          this.setOpened(!1),
          this.onChange && this.onChange(e.dataset.value);
      },
    }),
    (function () {
      var e = [];
      function t(t) {
        e.forEach(function (e) {
          e.showImage(t);
        });
      }
      (Bumble.Captcha = function (i) {
        (this.$wrapper = i.querySelector(".js-captcha")),
          this.$wrapper &&
            ((this.$image = this.$wrapper.querySelector(".js-captcha-img")),
            (this.$form = i),
            this.init.apply(this),
            t(
              this.$image.getAttribute("src") ||
                this.$image.getAttribute("data-src")
            ),
            e.push(this));
      }),
        (Bumble.Captcha.prototype = {
          init: function () {
            this.setElements(), this.setEvents();
          },
          isActive: function () {
            this.$input.getAttribute("disabled");
          },
          setElements: function () {
            (this.$input = this.$wrapper.querySelector(".js-captcha-input")),
              (this.$reset = this.$wrapper.querySelector(".js-captcha-reset")),
              (this.$error = this.$wrapper.querySelector(".js-captcha-error"));
          },
          setEvents: function () {
            this.$reset.addEventListener("click", this.reload.bind(this)),
              this.$input.addEventListener("blur", this.onBlur.bind(this));
          },
          showImage: function (e) {
            this.$image.src = e;
          },
          show: function () {
            this.$input.removeAttribute("disabled"),
              this.$wrapper.classList.remove("is-hidden"),
              this.reload();
          },
          hide: function () {
            this.$wrapper.classList.add("is-hidden");
          },
          reload: function () {
            var e = $vars.captcha_url + "&reload=1";
            (this.$input.value = ""),
              t(
                (e +=
                  "&rand=" +
                  Math.floor(1e6 * Math.random()) +
                  "&r" +
                  Math.floor(1e6 * Math.random()))
              );
          },
          onBlur: function () {
            this.validate();
          },
          setError: function (e) {
            this.$error.innerHTML = e;
          },
          showError: function (e) {
            e && this.setError(e), this.$wrapper.classList.add("is-invalid");
          },
          hideError: function () {
            this.$wrapper.classList.remove("is-invalid");
          },
          validate: function () {
            return "" === this.$input.value
              ? (this.showError(), !1)
              : (this.hideError(), !0);
          },
        });
    })(),
    (Bumble.InputPhone = function (e) {
      if (((this.$wrapper = e.querySelector(".js-input-phone")), this.$wrapper))
        return this.init.apply(this, arguments);
    }),
    (Bumble.InputPhone.prototype = {
      init: function () {
        this.setElements(), this.setEvents();
      },
      setElements: function () {
        (this.$codeCurrent = {}),
          (this.$select = new Bumble.Select(
            this.$wrapper.querySelector(".js-select")
          )),
          (this.$numberInput = this.$wrapper.querySelector(".js-number-input")),
          (this.$error = this.$wrapper.querySelector(".js-phone-error")),
          (this.$label = this.$wrapper.querySelector(".js-phone-label"));
      },
      setEvents: function () {
        this.$numberInput.addEventListener("blur", this.onBlur.bind(this)),
          this.$numberInput.addEventListener("focus", this.onFocus.bind(this));
      },
      onBlur: function () {
        this.validate(), this.$wrapper.classList.remove("is-focused");
      },
      onFocus: function () {
        this.$wrapper.classList.add("is-focused");
      },
      setError: function (e) {
        this.$error.innerHTML = e;
      },
      showError: function (e) {
        e && this.setError(e), this.$wrapper.classList.add("is-invalid");
      },
      hideError: function () {
        this.$wrapper.classList.remove("is-invalid");
      },
      validate: function () {
        var e = this.$numberInput.value.replace(/\D/g, ""),
          t;
        return 0 === e.length || (e.length > 4 && e.length < 13)
          ? (this.hideError(), !0)
          : (this.showError(), !1);
      },
    }),
    (function () {
      if ($vars.fileapi_config) var t = $vars.fileapi_config;
      if ($vars.form_error_messages) var i = $vars.form_error_messages;
      (Bumble.InputFile = function (e) {
        if (((this.$wrapper = e), this.$wrapper))
          return this.init.apply(this, arguments);
      }),
        (Bumble.InputFile.prototype = {
          init: function () {
            this.setElements(), this.setEvents();
          },
          setElements: function () {
            (this.$fileInput = this.$wrapper.querySelector(
              ".js-input-file-field"
            )),
              (this.$fileList = this.$wrapper.querySelector(
                ".js-input-file-list"
              )),
              (this.$error = this.$wrapper.querySelector(
                ".js-input-file-error"
              )),
              (this.files = e);
          },
          setEvents: function () {
            this.$fileInput.addEventListener(
              "change",
              this.onChange.bind(this)
            ),
              this.$fileList.addEventListener(
                "click",
                function (e) {
                  var t = e.target.closest(".js-input-file-item");
                  t &&
                    t.classList.contains("js-input-file-item") &&
                    this.deleteAttachment(t);
                }.bind(this)
              );
          },
          onChange: function (e) {
            e.preventDefault();
            var a = e.target.files,
              s;
            if (a.length + this.files._size > t.max_count)
              this.showError(i.file);
            else {
              for (var n = 0; n < a.length; n++) {
                var r = a[n];
                r.size > t.max_file_size
                  ? this.showError(i.file_7)
                  : this.renderFile(r);
              }
              this.$fileInput.value = "";
            }
          },
          showError: function (e) {
            this.$wrapper.classList.add("is-invalid"),
              (this.$error.innerHTML = e);
          },
          hideError: function () {
            this.$wrapper.classList.remove("is-invalid"),
              (this.$error.innerHTML = "");
          },
          setDisabled: function (e) {
            e
              ? this.$fileInput.setAttribute("disabled", "")
              : this.$fileInput.removeAttribute("disabled");
          },
          attachImage: function (e) {
            var t = Number(new Date()),
              i =
                '<div class="input-file__list-item js-input-file-item" data-id="' +
                t +
                '"> <div class="attached-file"> <div class="attached-file__preview" style="background-image: url(' +
                e +
                ');"> <div class="attached-file__close"> <i class="icon icon--sm"> <svg class="icon-svg"> <use xlink:href="#icon-close"></use></svg></i></div></div></div>';
            return this.$fileList.insertAdjacentHTML("beforeend", i), t;
          },
          attachFile: function (e) {
            var t = Number(new Date()),
              i =
                '<div class="input-file__list-item js-input-file-item" data-id="' +
                t +
                '"> <div class="attached-file"> <div class="attached-file__icon"> <i class="icon icon--lg"> <svg class="icon-svg"> <use xlink:href="#icon-file"></use></svg></i></div><div class="attached-file__close"><i class="icon icon--sm"><svg class="icon-svg"><use xlink:href="#icon-close"></use></svg></i></div></div></div>';
            return this.$fileList.insertAdjacentHTML("beforeend", i), t;
          },
          renderFile: function (e) {
            this.readFile(
              e,
              function (t) {
                var a = 0;
                if ("image" === this.checkFileType(e.name))
                  (a = this.attachImage(t.target.result)), this.hideError();
                else {
                  if ("text" !== this.checkFileType(e.name))
                    return void this.showError(i.file);
                  (a = this.attachFile(t.target.result)), this.hideError();
                }
                this.uploadFile(
                  e,
                  function (e) {
                    this.addFile(a, JSON.parse(e.target.response));
                  }.bind(this)
                );
              }.bind(this)
            );
          },
          addFile: function (e, t) {
            this.files[e] = t;
          },
          deleteFile: function (e) {
            delete this.files[e];
          },
          deleteAttachment: function (e) {
            var t = e.dataset.id;
            this.deleteFile(t), e.parentNode.removeChild(e);
          },
          clearFiles: function () {
            this.files = {};
          },
          uploadFile: function (e, i) {
            var a = new XMLHttpRequest(),
              s = new FormData(),
              n = t.default_platform_id,
              r = t.upload_urls[n][0];
            s.append("file", e, e.name),
              s.append("client_id", t.client_id),
              (a.withCredentials = !0),
              a.open("POST", r),
              (a.onload = i),
              (a.onerror = function (e) {
                console.log("Uploading error");
              }),
              a.send(s);
          },
          readFile: function (e, t) {
            var i = new FileReader();
            (i.onload = t), i.readAsDataURL(e);
          },
          checkFileType: function (e) {
            var t = [
                { type: "image", ext: "jpg" },
                { type: "image", ext: "png" },
                { type: "image", ext: "jpeg" },
                { type: "image", ext: "bmp" },
                { type: "image", ext: "gif" },
                { type: "text", ext: "pdf" },
                { type: "text", ext: "doc" },
                { type: "text", ext: "docx" },
                { type: "text", ext: "txt" },
                { type: "text", ext: "xls" },
                { type: "text", ext: "xlsx" },
                { type: "text", ext: "odt" },
                { type: "text", ext: "csv" },
                { type: "text", ext: "ods" },
              ],
              i = e.split("."),
              a = i[i.length - 1].toLowerCase();
            return (
              t.filter(function (e) {
                e.ext === a && (a = e.type);
              }),
              a
            );
          },
        });
    })(),
    (Bumble.InputRadio = function (e) {
      if (((this.$wrapper = e), this.$wrapper))
        return this.init.apply(this, arguments);
    }),
    (Bumble.InputRadio.prototype = {
      init: function () {
        this.setElements(), this.setEvents();
      },
      setElements: function () {
        (this._isError = !1),
          (this.$inputs = this.$wrapper.querySelectorAll("input[type=radio]")),
          (this.name = this.$inputs[0].name),
          (this.$error = this.$wrapper.querySelector(".js-input-radio-error"));
      },
      setEvents: function () {
        this.$inputs.forEach(
          function (e) {
            e.addEventListener("change", this.onChange.bind(this));
          }.bind(this)
        );
      },
      onChange: function () {
        this._isError && this.hideError();
      },
      setError: function (e) {
        (this._isError = !0), (this.$error.innerHTML = e);
      },
      showError: function (e) {
        this.setError(e), this.$wrapper.classList.add("is-invalid");
      },
      hideError: function () {
        this.$wrapper.classList.remove("is-invalid");
      },
    }),
    (Bumble.InputText = function (e) {
      if (((this.$wrapper = e), this.$wrapper))
        return this.init.apply(this, arguments);
    }),
    (Bumble.InputText.prototype = {
      init: function () {
        this.setElements(), this.setEvents();
      },
      setElements: function () {
        (this.$input = this.$wrapper.querySelector(".js-input-field")),
          (this.$error = this.$wrapper.querySelector(".js-input-error"));
      },
      setEvents: function () {
        this.$input.addEventListener("blur", this.onBlur.bind(this)),
          this.$input.addEventListener("keypress", this.onKeypress.bind(this)),
          this.$input.addEventListener("focus", this.onFocus.bind(this));
      },
      onKeypress: function (e) {
        this.validate();
        var t = this.$input.value.length,
          i = parseInt(this.$input.max);
        t >= i && (this.$input.value = this.$input.value.substring(0, i - 1));
      },
      onBlur: function () {
        this.validate(), this.$wrapper.classList.remove("is-focused");
      },
      onFocus: function () {
        this.$wrapper.classList.add("is-focused");
      },
      setError: function (e) {
        this.$error.innerHTML = e;
      },
      getName: function () {
        return this.$input.name;
      },
      getDisabled: function () {
        return this.$input.disabled;
      },
      showError: function (e) {
        e && this.setError(e), this.$wrapper.classList.add("is-invalid");
      },
      hideError: function () {
        this.$wrapper.classList.remove("is-invalid");
      },
      validate: function () {
        var e;
        if (0 === this.$input.value.replace(/\D/g, "").length)
          return this.hideError(), !0;
      },
    }),
    (Bumble.Form = function (e) {
      if (e) return (this.form = e), this.init.apply(this, arguments);
    }),
    (Bumble.Form.prototype = {
      init: function () {
        this.setElements(), this.setEvents();
      },
      setElements: function () {
        (this.captcha = new Bumble.Captcha(this.form)),
          (this.contentTriggers = new Bumble.ContentTriggers(
            this.form,
            this.hideErrors.bind(this)
          )),
          (this.files = e),
          (this.phone = new Bumble.InputPhone(this.form)),
          this.phone.$wrapper && (this._hasPhone = !0),
          (this.selects = []);
        var t = this.form.querySelectorAll(".js-select");
        t.length &&
          ((this._hasSelect = !0),
          t.forEach(
            function (e) {
              this.selects.push(new Bumble.Select(e));
            }.bind(this)
          )),
          (this.inputFiles = []);
        var i = this.form.querySelectorAll(".js-input-file"),
          a,
          s;
        i.length &&
          ((this._hasInputFile = !0),
          i.forEach(
            function (e) {
              this.inputFiles.push(new Bumble.InputFile(e));
            }.bind(this)
          )),
          (this.inputTexts = []),
          this.form.querySelectorAll(".js-input").forEach(
            function (e) {
              this.inputTexts.push(new Bumble.InputText(e));
            }.bind(this)
          ),
          (this.inputRadios = {}),
          this.form.querySelectorAll(".js-input-radio").forEach(
            function (e) {
              (e = new Bumble.InputRadio(e)), (this.inputRadios[e.name] = e);
            }.bind(this)
          );
      },
      setEvents: function () {
        this.form.addEventListener("submit", this.onSubmit.bind(this));
      },
      getActualInput: function (e) {
        var t = !1;
        return (
          this.inputTexts.forEach(function (i) {
            i.getName() === e && !1 === i.getDisabled() && (t = i);
          }),
          t
        );
      },
      showErrors: function (e) {
        for (var t in e)
          switch (t) {
            case "checkcode":
              this.captcha.showError(e.checkcode);
              break;
            case "tel_national":
              this.phone.showError(e.tel_national);
              break;
            case "phone_number":
              this.phone.showError(e.phone_number);
              break;
            case "phone_number_prefix":
              this.phone.showError(e.phone_number_prefix);
              break;
            default:
              var i = this.getActualInput(t);
              if (i) i.showError(e[t]);
              else if (this.inputRadios[t]) this.inputRadios[t].showError(e[t]);
              else if (this.form.querySelector("input[name=" + t + "]")) {
                var a = this.form.querySelector("input[name=" + t + "]");
                if (!1 === a.disabled) {
                  var s = a.closest(".form-field"),
                    n = s.querySelector(".js-field-error");
                  n && (n.innerHTML = e[t]), s.classList.add("is-invalid");
                }
              }
          }
      },
      toggleLoading: function () {
        this.form.classList.toggle("is-loading");
      },
      hideErrors: function () {
        for (var e in (this.captcha.hideError(),
        this._hasPhone && this.phone.hideError(),
        this.inputTexts))
          this.inputTexts[e].hideError();
        var t;
        this.form.querySelectorAll(".is-invalid").forEach(function (e) {
          e.classList.remove("is-invalid");
        });
      },
      onSubmit: function (e) {
        if (
          (e.preventDefault(),
          (!this.captcha ||
            !this.captcha.isActive() ||
            this.captcha.validate()) &&
            (!this._hasPhone || this.phone.validate()))
        ) {
          this._hasInputFile &&
            this.inputFiles.forEach(function (e) {
              e.setDisabled(!0);
            });
          var t = new FormData(this.form);
          if (Object.keys(this.files).length)
            for (var i in this.files) {
              var a = this.files[i];
              t.append("files[]", a.file_key);
            }
          var s = new XMLHttpRequest();
          s.open("POST", this.form.action),
            s.upload.addEventListener(
              "loadstart",
              function (e) {
                this.toggleLoading(), this.hideErrors();
              }.bind(this)
            ),
            s.upload.addEventListener(
              "loadend",
              function (e) {
                this.toggleLoading(),
                  this._hasInputFile &&
                    this.inputFiles.forEach(function (e) {
                      e.setDisabled(!1);
                    });
              }.bind(this)
            ),
            (s.onreadystatechange = function () {
              if (s.readyState === XMLHttpRequest.DONE && 200 === s.status) {
                var e = JSON.parse(s.responseText);
                if (
                  "object" == typeof e.errors &&
                  Object.keys(e.errors).length > 0
                )
                  return (
                    (e.errors.checkcode ||
                      !0 === e.errors.captcha_required ||
                      !0 === e.captcha_required) &&
                      this.captcha.show(),
                    void this.showErrors(e.errors)
                  );
                var t = this.form.dataset.seoName,
                  i = this.form.dataset.seoCategory,
                  a = this.form.dataset.seoAction,
                  n = this.form.dataset.seoLabel;
                t && i && a && n && sendEvent(i, a, n),
                  e.html
                    ? r.setContent(e.html)
                    : e.title &&
                      e.description &&
                      r.setContent(
                        '<div class="modal__content-inner modal__content-inner--center">\n    <h2 class="modal__title">' +
                          e.title +
                          '</h2>\n    <p class="modal__text">' +
                          e.description +
                          "</p>\n</div>\n"
                      ),
                  r.open(),
                  this.hideErrors(),
                  this.captcha.hide(),
                  this.form.reset(),
                  (this.files = []);
              }
            }.bind(this)),
            s.send(t);
        }
      },
    });
  var n = [];
  document.querySelectorAll(".js-form").forEach(function (e) {
    n.push(new Bumble.Form(e));
  }),
    (Bumble.Modal = function () {
      if (
        ((this.$wrapper = document.body.querySelector(".js-modal")),
        this.$wrapper)
      )
        return this.init.apply(this, arguments);
    }),
    (Bumble.Modal.prototype = {
      init: function () {
        this.setElements(),
          this.setEvents(),
          this.checkHash(),
          this.onHashChange();
      },
      setElements: function () {
        (this.$content = this.$wrapper.querySelector(".js-modal-content")),
          (this.$close = this.$wrapper.querySelectorAll(".js-modal-close")),
          (this.$open = document.body.querySelectorAll(".js-modal-open"));
      },
      setEvents: function () {
        this.$close.forEach(
          function (e) {
            e.addEventListener("click", this.close.bind(this));
          }.bind(this)
        ),
          this.$open.forEach(
            function (e) {
              e.addEventListener("click", this.open.bind(this));
            }.bind(this)
          );
      },
      setContent: function (e) {
        (this.$content.innerHTML = e),
          (this.$form = this.$content.querySelector(".js-form")),
          this.$form && (this.form = new Bumble.Form(this.$form));
      },
      setOpened: function (e) {
        document.body.classList.toggle("is-opened-modal", e),
          this.$wrapper.classList.toggle("is-active", e);
      },
      close: function (e) {
        this.setOpened(!1),
          (this.$content.innerHTML = ""),
          history.pushState({}, document.title, "#");
      },
      open: function (e) {
        this.setOpened(!0);
      },
      onHashChange: function () {
        window.addEventListener(
          "hashchange",
          function () {
            this.checkHash();
          }.bind(this)
        );
      },
      checkHash: function () {
        if ("#download-app" == location.hash) return !1;
        var e = Bumble.routes[location.hash.replace("#", "")];
        if (!e) return !1;
        var t = document.body.querySelector(
          "[data-modal-container=" + e + "]"
        ).innerHTML;
        this.setContent(t), this.beforeOpen(), this.open();
      },
      beforeOpen: function () {},
    });
  var r = new Bumble.Modal(),
    o,
    l,
    d,
    c,
    u,
    p;
  !(function () {
    var e = document.querySelector(".js-header-navigation"),
      t =
        document.body.classList.contains("ie11") ||
        document.body.classList.contains("edge"),
      i = 0;
    function a(t) {
      e.classList.toggle("is-hidden", !t);
    }
    function s() {
      if (
        document.documentElement.clientWidth < 600 ||
        document.documentElement.clientHeight < 600
      ) {
        var t = Math.max(window.scrollY, 0);
        if ((e.classList.add("is-fixed"), Math.abs(i - t) <= 5)) return;
        t > i
          ? a(!1)
          : t + window.innerHeight < document.documentElement.scrollHeight &&
            a(!0),
          (i = t);
      } else a(!0), e.classList.remove("is-fixed");
    }
    var n = Bumble.throttle(s, 300);
    e &&
      !1 === t &&
      (window.addEventListener("scroll", n),
      window.addEventListener("resize", n));
  })(),
    (function () {
      var e = document.querySelector(".js-open-menu"),
        t = document.querySelector(".js-close-menu");
      function i(e) {
        document.body.classList.toggle("is-opened-mobile-nav", e),
          Bumble.toggleFixed(e),
          document
            .querySelector(".js-mobile-navigation")
            .classList.toggle("is-active", e);
      }
      e &&
        e.addEventListener("click", function () {
          i(!0);
        }),
        t &&
          t.addEventListener("click", function () {
            i(!1);
          });
    })(),
    (o = document.querySelector(".js-vacancies-select")) &&
      (new Bumble.Select(o).onChange = function (e) {
        window.location.href = e ? "?location=" + encodeURIComponent(e) : "?";
      }),
    (function () {
      function e(e) {
        var t = document.createElement("template");
        if ("content" in t)
          return (t.innerHTML = e), document.importNode(t.content, !0);
        var i = document.createDocumentFragment(),
          a = document.createElement("div");
        for (a.innerHTML = e; a.firstChild; ) i.appendChild(a.firstChild);
        return i;
      }
      function t(e, t) {
        [].forEach.call(document.querySelectorAll(e), function (e) {
          e.addEventListener("click", t);
        });
      }
      t(".js-see-more-link", function (t) {
        t.preventDefault();
        var i = t.currentTarget;
        if (i.dataset.loading) return !1;
        var a = i.dataset.href,
          s = i
            .closest(".js-see-more-parent")
            .querySelector(".js-see-more-target"),
          n = new XMLHttpRequest();
        n.addEventListener("load", function () {
          (i.style.display = "none"), s.appendChild(e(n.responseText));
        }),
          n.addEventListener("error", function () {
            i.dataset.loading = "";
          }),
          n.open("GET", a),
          n.send(),
          (i.dataset.loading = !0);
      });
    })(),
    (d = Bumble),
    (c = 0),
    (d.toggleFixed = function (e) {
      var t = $(".js-page"),
        i = $(".h-transform-sensitive");
      e
        ? ((c = $(window).scrollTop()),
          t.addClass("is-fixed"),
          t.css("transform", "translate3d(0, " + -c + "px, 0)"),
          i.css("transform", "translate3d(0, " + c + "px, 0)"),
          $(window).scrollTop(0))
        : (t.removeClass("is-fixed"),
          t.css("transform", "none"),
          i.css("transform", "none"),
          $(window).scrollTop(c));
    }),
    (function () {
      var e = "cookie_settings",
        t = {
          functional: "functional",
          analitical: "analytics",
          analytics: "analytics",
        },
        i = document.querySelector(".js-cookie-policy-save"),
        a = document.querySelector(".js-cookie-notification"),
        s = r();
      function n(e, t, i, a, s, r) {
        return 1 == arguments.length
          ? document.cookie.match(new RegExp("(^|; )" + e + "=(.*?)(;|$)"))
            ? decodeURIComponent(RegExp.$2)
            : void 0
          : ((document.cookie =
              e +
              "=" +
              encodeURIComponent(t) +
              (i
                ? "; expires=" + (i instanceof Date ? i.toGMTString() : i)
                : "") +
              (a ? "; path=" + a : "") +
              (s ? "; domain=" + s : "") +
              (r ? "; secure" : "")),
            n(e) === t);
      }
      function r() {
        var t = n(e),
          i = null;
        return t && (i = JSON.parse(t)), i;
      }
      function o(t) {
        var i = new Date();
        i.setTime(Number(new Date()) + 31536e6), n(e, JSON.stringify(t), i);
      }
      function l(e) {
        if (!document.querySelector('a[name="' + e + '"]')) return !1;
        var i = r(),
          a = document
            .querySelector(".formatted-text")
            .querySelector('a[name="' + e + '"]').parentNode,
          s,
          n = document
            .querySelector("#cookie-policy-toggler-template")
            .content.cloneNode(!0);
        n.querySelectorAll("input.js-cookie-toggle").forEach(function (a) {
          a.setAttribute("name", t[e]),
            i && i[t[e]] === Boolean(parseFloat(a.value))
              ? a.setAttribute("checked", "")
              : a.removeAttribute("checked"),
            a.addEventListener("click", d);
        }),
          a.after(n);
      }
      function d() {
        var e = {};
        return (
          i.classList.add("is-loading"),
          window.setTimeout(function () {
            i.classList.remove("is-loading");
          }, 1e3),
          document.querySelectorAll(".js-cookie-toggle").forEach(function (t) {
            t.checked &&
              (e[t.getAttribute("name")] = Boolean(parseFloat(t.value)));
          }),
          o(e),
          u(),
          !1
        );
      }
      function c() {
        o({ functional: !0, analytics: !0 }), u();
      }
      function u() {
        var e = r();
        e
          ? ((a.style.display = "none"),
            document.body.classList.add("show-cookie-notification"))
          : ((a.style.display = "block"),
            document.body.classList.remove("show-cookie-notification")),
          document.querySelector(".js-cookie-toggle") &&
            document
              .querySelectorAll(".js-cookie-toggle")
              .forEach(function (t) {
                e[t.name] === Boolean(parseFloat(t.value)) && (t.checked = !0);
              });
      }
      i && i.addEventListener("click", d),
        a &&
          a.querySelector(".js-cookie-accept-all") &&
          a.querySelector(".js-cookie-accept-all").addEventListener("click", c),
        s && u(),
        window.addEventListener("DOMContentLoaded", function () {
          if ((u(), location.href.includes("cookie-policy")))
            for (var e in t) l(e);
        });
    })(),
    (u = window.delegate(
      document.body,
      ".js-event-link",
      "click",
      function (e) {
        var t = e.target,
          i = t.dataset.seoName,
          a = t.dataset.seoCategory,
          s = t.dataset.seoAction,
          n = t.dataset.seoLabel,
          r;
        i &&
          a &&
          s &&
          n &&
          i.split(" ").forEach(function (e) {
            switch (e) {
              case "event":
                sendEvent(a, s, n);
                break;
              default:
                sendAction(e);
            }
          });
      }
    )),
    (function () {
      function e(e, t) {
        [].forEach.call(document.querySelectorAll(e), function (e) {
          e.addEventListener("click", t);
        });
      }
      var t;
      ({
        init: function () {
          e(".js-share-button.facebook", this.facebook.bind(this)),
            e(".js-share-button.twitter", this.twitter.bind(this)),
            e(".js-share-button.pinterest", this.pinterest.bind(this)),
            e(".js-share-button.linkedin", this.linkedin.bind(this));
        },
        pinterest: function (e) {
          e.preventDefault(),
            this.popup(
              "http://www.pinterest.com/pin/create/button/?url=" +
                encodeURIComponent(document.location.href),
              "Pinterest"
            );
        },
        facebook: function (e) {
          e.preventDefault(),
            this.popup(
              "https://www.facebook.com/share.php?u=" +
                encodeURIComponent(document.location.href),
              "Facebook"
            );
        },
        twitter: function (e) {
          e.preventDefault(),
            this.popup(
              "https://twitter.com/intent/tweet?url=" +
                encodeURIComponent(document.location.href) +
                "&text=" +
                encodeURIComponent(""),
              "Twitter"
            );
        },
        linkedin: function (e) {
          e.preventDefault(),
            this.popup(
              "https://www.linkedin.com/shareArticle?url=" +
                encodeURIComponent(document.location.href) +
                "&mini=true",
              "Linkedin"
            );
        },
        popup: function (e, t) {
          var i = 575,
            a = 400,
            s = (window.innerWidth - i) / 2,
            n,
            r =
              "status=1,width=575,height=400,top=" +
              (window.innerHeight - a) / 2 +
              ",left=" +
              s;
          window.open(e, t, r);
        },
      }.init());
    })(),
    {
      scrollProgressElm: null,
      jsScrollContainer: document.querySelector(".js-scroll-indicator"),
      jsScrollElm: document.querySelector(".js-scroll-indicator-bar"),
      init: function () {
        this.jsScrollElm &&
          (this.updateScrollProgress(),
          (window.onscroll = Bumble.throttle(
            function () {
              this.updateScrollProgress();
            }.bind(this),
            100,
            { leading: !0 }
          )));
      },
      updateScrollProgress: function () {
        var e = document.body.scrollTop || document.documentElement.scrollTop,
          t = document.querySelector(".js-scroll-indicator-target"),
          i = t && t.getBoundingClientRect(),
          a,
          s,
          n =
            e /
            ((i ? i.bottom + e : document.documentElement.scrollHeight) -
              document.documentElement.clientHeight);
        this.jsScrollContainer.classList.toggle("is-active", Boolean(e)),
          (this.jsScrollElm.style.transform = "scale(" + n + ", 1)");
      },
    }.init(),
    (function () {
      var e = function () {
        (this.$searchInput = $(".js-search-input")),
          (this.$searchClear = $(".js-search-clear")),
          this.addEvents();
      };
      e.prototype = {
        addEvents: function () {
          this.$searchInput.on(
            "change input paste",
            this.updateSearchInput.bind(this)
          ),
            this.$searchInput.on("focus", this.setInputActive.bind(this, !0)),
            this.$searchInput.on("blur", this.setInputActive.bind(this, !1)),
            this.$searchClear.click(this.clearSearchInput.bind(this));
        },
        setInputActive: function (e) {
          $(".js-search-field").toggleClass("is-active", Boolean(e));
        },
        updateSearchInput: function () {
          this.toggleClearButton(this.$searchInput.val());
        },
        clearSearchInput: function () {
          this.$searchInput.val(""), this.updateSearchInput();
        },
        toggleClearButton: function (e) {
          return this.$searchClear.toggle(Boolean(e)), this;
        },
      };
      var t = new e();
    })(),
    (function () {
      var e = function () {
        (this.$voteButton = $(".js-feedback-vote")),
          (this.$noVoteButton = $(".js-feedback-vote-no")),
          (this.$noVoteOption = $(".js-feedback-vote-option")),
          (this.$showMore = $(".js-show-more")),
          this.addEvents();
      };
      e.prototype = {
        addEvents: function () {
          this.$voteButton.click(this.sendVote.bind(this)),
            this.$noVoteButton.click(this.showVoteOptions.bind(this)),
            this.$noVoteOption.click(this.showResponse.bind(this)),
            this.$showMore.click(this.toggleShowMore.bind(this));
        },
        toggleShowMore: function () {
          this.$showMore.toggleClass("is-opened");
        },
        sendVote: function (e) {
          e.preventDefault();
          var t = $(e.currentTarget).data("href");
          $.get(t, function () {}, "json"),
            $(".js-feedback-actions").hide(),
            $(".js-feedback-follow-up").hide(),
            $(".js-feedback-results").show(),
            $(".js-feedback-negative-results").hide();
        },
        showResponse: function () {
          $(".js-feedback-actions").hide(),
            $(".js-feedback-follow-up").hide(),
            $(".js-feedback-results").hide(),
            $(".js-feedback-negative-results").show();
        },
        showVoteOptions: function () {
          $(".js-feedback-actions").hide(),
            $(".js-feedback-follow-up").show(),
            $(".js-feedback-results").hide(),
            $(".js-feedback-negative-results").hide();
        },
      };
      var t = new e();
    })(),
    testWepP();
}
window.NodeList &&
  !NodeList.prototype.forEach &&
  (NodeList.prototype.forEach = function (e, t) {
    t = t || window;
    for (var i = 0; i < this.length; i++) e.call(t, this[i], i, this);
  }),
  (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
      ? (module.exports = t())
      : "function" == typeof define && define.amd
      ? define(t)
      : (e.Swiper = t());
  })(this, function () {
    function e(e, t) {
      var i = [],
        a = 0;
      if (e && !t && e instanceof n) return e;
      if (e)
        if ("string" == typeof e) {
          var s,
            r,
            o = e.trim();
          if (o.indexOf("<") >= 0 && o.indexOf(">") >= 0) {
            var l = "div";
            for (
              0 === o.indexOf("<li") && (l = "ul"),
                0 === o.indexOf("<tr") && (l = "tbody"),
                (0 !== o.indexOf("<td") && 0 !== o.indexOf("<th")) ||
                  (l = "tr"),
                0 === o.indexOf("<tbody") && (l = "table"),
                0 === o.indexOf("<option") && (l = "select"),
                (r = document.createElement(l)).innerHTML = o,
                a = 0;
              a < r.childNodes.length;
              a += 1
            )
              i.push(r.childNodes[a]);
          } else
            for (
              s =
                t || "#" !== e[0] || e.match(/[ .<>:~]/)
                  ? (t || document).querySelectorAll(e.trim())
                  : [document.getElementById(e.trim().split("#")[1])],
                a = 0;
              a < s.length;
              a += 1
            )
              s[a] && i.push(s[a]);
        } else if (e.nodeType || e === window || e === document) i.push(e);
        else if (e.length > 0 && e[0].nodeType)
          for (a = 0; a < e.length; a += 1) i.push(e[a]);
      return new n(i);
    }
    function t(e) {
      for (var t = [], i = 0; i < e.length; i += 1)
        -1 === t.indexOf(e[i]) && t.push(e[i]);
      return t;
    }
    function i() {
      var e = "onwheel" in d;
      if (!e) {
        var t = d.createElement("div");
        t.setAttribute("onwheel", "return;"),
          (e = "function" == typeof t.onwheel);
      }
      return (
        !e &&
          d.implementation &&
          d.implementation.hasFeature &&
          !0 !== d.implementation.hasFeature("", "") &&
          (e = d.implementation.hasFeature("Events.wheel", "3.0")),
        e
      );
    }
    var a,
      s = (a =
        "undefined" == typeof window
          ? {
              navigator: { userAgent: "" },
              location: {},
              history: {},
              addEventListener: function () {},
              removeEventListener: function () {},
              getComputedStyle: function () {
                return {};
              },
              Image: function () {},
              Date: function () {},
              screen: {},
            }
          : window),
      n = function (e) {
        for (var t = this, i = 0; i < e.length; i += 1) t[i] = e[i];
        return (t.length = e.length), this;
      };
    (e.fn = n.prototype),
      (e.Class = n),
      (e.Dom7 = n),
      "resize scroll".split(" ");
    var r = {
      addClass: function (e) {
        var t = this;
        if (void 0 === e) return this;
        for (var i = e.split(" "), a = 0; a < i.length; a += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== t[s].classList && t[s].classList.add(i[a]);
        return this;
      },
      removeClass: function (e) {
        for (var t = this, i = e.split(" "), a = 0; a < i.length; a += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== t[s].classList && t[s].classList.remove(i[a]);
        return this;
      },
      hasClass: function (e) {
        return !!this[0] && this[0].classList.contains(e);
      },
      toggleClass: function (e) {
        for (var t = this, i = e.split(" "), a = 0; a < i.length; a += 1)
          for (var s = 0; s < this.length; s += 1)
            void 0 !== t[s].classList && t[s].classList.toggle(i[a]);
        return this;
      },
      attr: function (e, t) {
        var i = arguments,
          a = this;
        if (1 !== arguments.length || "string" != typeof e) {
          for (var s = 0; s < this.length; s += 1)
            if (2 === i.length) a[s].setAttribute(e, t);
            else for (var n in e) (a[s][n] = e[n]), a[s].setAttribute(n, e[n]);
          return this;
        }
        if (this[0]) return this[0].getAttribute(e);
      },
      removeAttr: function (e) {
        for (var t = this, i = 0; i < this.length; i += 1)
          t[i].removeAttribute(e);
        return this;
      },
      data: function (e, t) {
        var i,
          a = this;
        if (void 0 !== t) {
          for (var s = 0; s < this.length; s += 1)
            (i = a[s]).dom7ElementDataStorage ||
              (i.dom7ElementDataStorage = {}),
              (i.dom7ElementDataStorage[e] = t);
          return this;
        }
        if ((i = this[0])) {
          if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage)
            return i.dom7ElementDataStorage[e];
          var n = i.getAttribute("data-" + e);
          if (n) return n;
        }
      },
      transform: function (e) {
        for (var t = this, i = 0; i < this.length; i += 1) {
          var a = t[i].style;
          (a.webkitTransform = e), (a.transform = e);
        }
        return this;
      },
      transition: function (e) {
        var t = this;
        "string" != typeof e && (e += "ms");
        for (var i = 0; i < this.length; i += 1) {
          var a = t[i].style;
          (a.webkitTransitionDuration = e), (a.transitionDuration = e);
        }
        return this;
      },
      on: function () {
        function t(t) {
          var i = t.target;
          if (i) {
            var a = t.target.dom7EventData || [];
            if ((a.unshift(t), e(i).is(o))) l.apply(i, a);
            else
              for (var s = e(i).parents(), n = 0; n < s.length; n += 1)
                e(s[n]).is(o) && l.apply(s[n], a);
          }
        }
        function i(e) {
          var t = (e && e.target && e.target.dom7EventData) || [];
          t.unshift(e), l.apply(this, t);
        }
        for (var a = this, s = [], n = arguments.length; n--; )
          s[n] = arguments[n];
        var r = s[0],
          o = s[1],
          l = s[2],
          d = s[3],
          c;
        "function" == typeof s[1] &&
          ((r = (c = s)[0]), (l = c[1]), (d = c[2]), (o = void 0));
        d || (d = !1);
        for (var u, p = r.split(" "), h = 0; h < this.length; h += 1) {
          var f = a[h];
          if (o)
            for (u = 0; u < p.length; u += 1)
              f.dom7LiveListeners || (f.dom7LiveListeners = []),
                f.dom7LiveListeners.push({
                  type: r,
                  listener: l,
                  proxyListener: t,
                }),
                f.addEventListener(p[u], t, d);
          else
            for (u = 0; u < p.length; u += 1)
              f.dom7Listeners || (f.dom7Listeners = []),
                f.dom7Listeners.push({
                  type: r,
                  listener: l,
                  proxyListener: i,
                }),
                f.addEventListener(p[u], i, d);
        }
        return this;
      },
      off: function () {
        for (var e = this, t = [], i = arguments.length; i--; )
          t[i] = arguments[i];
        var a = t[0],
          s = t[1],
          n = t[2],
          r = t[3],
          o;
        "function" == typeof t[1] &&
          ((a = (o = t)[0]), (n = o[1]), (r = o[2]), (s = void 0));
        r || (r = !1);
        for (var l = a.split(" "), d = 0; d < l.length; d += 1)
          for (var c = 0; c < this.length; c += 1) {
            var u = e[c];
            if (s) {
              if (u.dom7LiveListeners)
                for (var p = 0; p < u.dom7LiveListeners.length; p += 1)
                  n
                    ? u.dom7LiveListeners[p].listener === n &&
                      u.removeEventListener(
                        l[d],
                        u.dom7LiveListeners[p].proxyListener,
                        r
                      )
                    : u.dom7LiveListeners[p].type === l[d] &&
                      u.removeEventListener(
                        l[d],
                        u.dom7LiveListeners[p].proxyListener,
                        r
                      );
            } else if (u.dom7Listeners)
              for (var h = 0; h < u.dom7Listeners.length; h += 1)
                n
                  ? u.dom7Listeners[h].listener === n &&
                    u.removeEventListener(
                      l[d],
                      u.dom7Listeners[h].proxyListener,
                      r
                    )
                  : u.dom7Listeners[h].type === l[d] &&
                    u.removeEventListener(
                      l[d],
                      u.dom7Listeners[h].proxyListener,
                      r
                    );
          }
        return this;
      },
      trigger: function () {
        for (var e = this, t = [], i = arguments.length; i--; )
          t[i] = arguments[i];
        for (var a = t[0].split(" "), s = t[1], n = 0; n < a.length; n += 1)
          for (var r = 0; r < this.length; r += 1) {
            var o = void 0;
            try {
              o = new window.CustomEvent(a[n], {
                detail: s,
                bubbles: !0,
                cancelable: !0,
              });
            } catch (e) {
              (o = document.createEvent("Event")).initEvent(a[n], !0, !0),
                (o.detail = s);
            }
            (e[r].dom7EventData = t.filter(function (e, t) {
              return t > 0;
            })),
              e[r].dispatchEvent(o),
              (e[r].dom7EventData = []),
              delete e[r].dom7EventData;
          }
        return this;
      },
      transitionEnd: function (e) {
        function t(n) {
          if (n.target === this)
            for (e.call(this, n), i = 0; i < a.length; i += 1) s.off(a[i], t);
        }
        var i,
          a = ["webkitTransitionEnd", "transitionend"],
          s = this;
        if (e) for (i = 0; i < a.length; i += 1) s.on(a[i], t);
        return this;
      },
      outerWidth: function (e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return (
              this[0].offsetWidth +
              parseFloat(t.getPropertyValue("margin-right")) +
              parseFloat(t.getPropertyValue("margin-left"))
            );
          }
          return this[0].offsetWidth;
        }
        return null;
      },
      outerHeight: function (e) {
        if (this.length > 0) {
          if (e) {
            var t = this.styles();
            return (
              this[0].offsetHeight +
              parseFloat(t.getPropertyValue("margin-top")) +
              parseFloat(t.getPropertyValue("margin-bottom"))
            );
          }
          return this[0].offsetHeight;
        }
        return null;
      },
      offset: function () {
        if (this.length > 0) {
          var e = this[0],
            t = e.getBoundingClientRect(),
            i = document.body,
            a = e.clientTop || i.clientTop || 0,
            s = e.clientLeft || i.clientLeft || 0,
            n = e === window ? window.scrollY : e.scrollTop,
            r = e === window ? window.scrollX : e.scrollLeft;
          return { top: t.top + n - a, left: t.left + r - s };
        }
        return null;
      },
      css: function (e, t) {
        var i,
          a = this;
        if (1 === arguments.length) {
          if ("string" != typeof e) {
            for (i = 0; i < this.length; i += 1)
              for (var s in e) a[i].style[s] = e[s];
            return this;
          }
          if (this[0])
            return window.getComputedStyle(this[0], null).getPropertyValue(e);
        }
        if (2 === arguments.length && "string" == typeof e) {
          for (i = 0; i < this.length; i += 1) a[i].style[e] = t;
          return this;
        }
        return this;
      },
      each: function (e) {
        var t = this;
        if (!e) return this;
        for (var i = 0; i < this.length; i += 1)
          if (!1 === e.call(t[i], i, t[i])) return t;
        return this;
      },
      html: function (e) {
        var t = this;
        if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
        for (var i = 0; i < this.length; i += 1) t[i].innerHTML = e;
        return this;
      },
      text: function (e) {
        var t = this;
        if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
        for (var i = 0; i < this.length; i += 1) t[i].textContent = e;
        return this;
      },
      is: function (t) {
        var i,
          a,
          s = this[0];
        if (!s || void 0 === t) return !1;
        if ("string" == typeof t) {
          if (s.matches) return s.matches(t);
          if (s.webkitMatchesSelector) return s.webkitMatchesSelector(t);
          if (s.msMatchesSelector) return s.msMatchesSelector(t);
          for (i = e(t), a = 0; a < i.length; a += 1) if (i[a] === s) return !0;
          return !1;
        }
        if (t === document) return s === document;
        if (t === window) return s === window;
        if (t.nodeType || t instanceof n) {
          for (i = t.nodeType ? [t] : t, a = 0; a < i.length; a += 1)
            if (i[a] === s) return !0;
          return !1;
        }
        return !1;
      },
      index: function () {
        var e,
          t = this[0];
        if (t) {
          for (e = 0; null !== (t = t.previousSibling); )
            1 === t.nodeType && (e += 1);
          return e;
        }
      },
      eq: function (e) {
        if (void 0 === e) return this;
        var t,
          i = this.length;
        return e > i - 1
          ? new n([])
          : e < 0
          ? new n((t = i + e) < 0 ? [] : [this[t]])
          : new n([this[e]]);
      },
      append: function () {
        for (var e = this, t = [], i = arguments.length; i--; )
          t[i] = arguments[i];
        for (var a, s = 0; s < t.length; s += 1) {
          a = t[s];
          for (var r = 0; r < this.length; r += 1)
            if ("string" == typeof a) {
              var o = document.createElement("div");
              for (o.innerHTML = a; o.firstChild; )
                e[r].appendChild(o.firstChild);
            } else if (a instanceof n)
              for (var l = 0; l < a.length; l += 1) e[r].appendChild(a[l]);
            else e[r].appendChild(a);
        }
        return this;
      },
      prepend: function (e) {
        var t,
          i,
          a = this;
        for (t = 0; t < this.length; t += 1)
          if ("string" == typeof e) {
            var s = document.createElement("div");
            for (s.innerHTML = e, i = s.childNodes.length - 1; i >= 0; i -= 1)
              a[t].insertBefore(s.childNodes[i], a[t].childNodes[0]);
          } else if (e instanceof n)
            for (i = 0; i < e.length; i += 1)
              a[t].insertBefore(e[i], a[t].childNodes[0]);
          else a[t].insertBefore(e, a[t].childNodes[0]);
        return this;
      },
      next: function (t) {
        return new n(
          this.length > 0
            ? t
              ? this[0].nextElementSibling &&
                e(this[0].nextElementSibling).is(t)
                ? [this[0].nextElementSibling]
                : []
              : this[0].nextElementSibling
              ? [this[0].nextElementSibling]
              : []
            : []
        );
      },
      nextAll: function (t) {
        var i = [],
          a = this[0];
        if (!a) return new n([]);
        for (; a.nextElementSibling; ) {
          var s = a.nextElementSibling;
          t ? e(s).is(t) && i.push(s) : i.push(s), (a = s);
        }
        return new n(i);
      },
      prev: function (t) {
        if (this.length > 0) {
          var i = this[0];
          return new n(
            t
              ? i.previousElementSibling && e(i.previousElementSibling).is(t)
                ? [i.previousElementSibling]
                : []
              : i.previousElementSibling
              ? [i.previousElementSibling]
              : []
          );
        }
        return new n([]);
      },
      prevAll: function (t) {
        var i = [],
          a = this[0];
        if (!a) return new n([]);
        for (; a.previousElementSibling; ) {
          var s = a.previousElementSibling;
          t ? e(s).is(t) && i.push(s) : i.push(s), (a = s);
        }
        return new n(i);
      },
      parent: function (i) {
        for (var a = this, s = [], n = 0; n < this.length; n += 1)
          null !== a[n].parentNode &&
            (i
              ? e(a[n].parentNode).is(i) && s.push(a[n].parentNode)
              : s.push(a[n].parentNode));
        return e(t(s));
      },
      parents: function (i) {
        for (var a = this, s = [], n = 0; n < this.length; n += 1)
          for (var r = a[n].parentNode; r; )
            i ? e(r).is(i) && s.push(r) : s.push(r), (r = r.parentNode);
        return e(t(s));
      },
      closest: function (e) {
        var t = this;
        return void 0 === e
          ? new n([])
          : (t.is(e) || (t = t.parents(e).eq(0)), t);
      },
      find: function (e) {
        for (var t = this, i = [], a = 0; a < this.length; a += 1)
          for (var s = t[a].querySelectorAll(e), r = 0; r < s.length; r += 1)
            i.push(s[r]);
        return new n(i);
      },
      children: function (i) {
        for (var a = this, s = [], r = 0; r < this.length; r += 1)
          for (var o = a[r].childNodes, l = 0; l < o.length; l += 1)
            i
              ? 1 === o[l].nodeType && e(o[l]).is(i) && s.push(o[l])
              : 1 === o[l].nodeType && s.push(o[l]);
        return new n(t(s));
      },
      remove: function () {
        for (var e = this, t = 0; t < this.length; t += 1)
          e[t].parentNode && e[t].parentNode.removeChild(e[t]);
        return this;
      },
      add: function () {
        for (var t = [], i = arguments.length; i--; ) t[i] = arguments[i];
        var a,
          s,
          n = this;
        for (a = 0; a < t.length; a += 1) {
          var r = e(t[a]);
          for (s = 0; s < r.length; s += 1)
            (n[n.length] = r[s]), (n.length += 1);
        }
        return n;
      },
      styles: function () {
        return this[0] ? window.getComputedStyle(this[0], null) : {};
      },
    };
    Object.keys(r).forEach(function (t) {
      e.fn[t] = r[t];
    });
    var o,
      l = {
        deleteProps: function (e) {
          var t = e;
          Object.keys(t).forEach(function (e) {
            try {
              t[e] = null;
            } catch (e) {}
            try {
              delete t[e];
            } catch (e) {}
          });
        },
        nextTick: function (e, t) {
          return void 0 === t && (t = 0), setTimeout(e, t);
        },
        now: function () {
          return Date.now();
        },
        getTranslate: function (e, t) {
          void 0 === t && (t = "x");
          var i,
            a,
            n,
            r = s.getComputedStyle(e, null);
          return (
            s.WebKitCSSMatrix
              ? ((a = r.transform || r.webkitTransform).split(",").length > 6 &&
                  (a = a
                    .split(", ")
                    .map(function (e) {
                      return e.replace(",", ".");
                    })
                    .join(", ")),
                (n = new s.WebKitCSSMatrix("none" === a ? "" : a)))
              : (i = (n =
                  r.MozTransform ||
                  r.OTransform ||
                  r.MsTransform ||
                  r.msTransform ||
                  r.transform ||
                  r
                    .getPropertyValue("transform")
                    .replace("translate(", "matrix(1, 0, 0, 1,"))
                  .toString()
                  .split(",")),
            "x" === t &&
              (a = s.WebKitCSSMatrix
                ? n.m41
                : 16 === i.length
                ? parseFloat(i[12])
                : parseFloat(i[4])),
            "y" === t &&
              (a = s.WebKitCSSMatrix
                ? n.m42
                : 16 === i.length
                ? parseFloat(i[13])
                : parseFloat(i[5])),
            a || 0
          );
        },
        parseUrlQuery: function (e) {
          var t,
            i,
            a,
            n,
            r = {},
            o = e || s.location.href;
          if ("string" == typeof o && o.length)
            for (
              n = (i = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "")
                .split("&")
                .filter(function (e) {
                  return "" !== e;
                })).length,
                t = 0;
              t < n;
              t += 1
            )
              (a = i[t].replace(/#\S+/g, "").split("=")),
                (r[decodeURIComponent(a[0])] =
                  void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
          return r;
        },
        isObject: function (e) {
          return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            e.constructor === Object
          );
        },
        extend: function () {
          for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
          for (var i = Object(e[0]), a = 1; a < e.length; a += 1) {
            var s = e[a];
            if (null != s)
              for (
                var n = Object.keys(Object(s)), r = 0, o = n.length;
                r < o;
                r += 1
              ) {
                var d = n[r],
                  c = Object.getOwnPropertyDescriptor(s, d);
                void 0 !== c &&
                  c.enumerable &&
                  (l.isObject(i[d]) && l.isObject(s[d])
                    ? l.extend(i[d], s[d])
                    : !l.isObject(i[d]) && l.isObject(s[d])
                    ? ((i[d] = {}), l.extend(i[d], s[d]))
                    : (i[d] = s[d]));
              }
          }
          return i;
        },
      },
      d = (o =
        "undefined" == typeof document
          ? {
              addEventListener: function () {},
              removeEventListener: function () {},
              activeElement: { blur: function () {}, nodeName: "" },
              querySelector: function () {
                return {};
              },
              querySelectorAll: function () {
                return [];
              },
              createElement: function () {
                return {
                  style: {},
                  setAttribute: function () {},
                  getElementsByTagName: function () {
                    return [];
                  },
                };
              },
              location: { hash: "" },
            }
          : document),
      c = {
        touch:
          (s.Modernizr && !0 === s.Modernizr.touch) ||
          !!(
            "ontouchstart" in s ||
            (s.DocumentTouch && d instanceof s.DocumentTouch)
          ),
        transforms3d:
          (s.Modernizr && !0 === s.Modernizr.csstransforms3d) ||
          (function () {
            var e = d.createElement("div").style;
            return (
              "webkitPerspective" in e ||
              "MozPerspective" in e ||
              "OPerspective" in e ||
              "MsPerspective" in e ||
              "perspective" in e
            );
          })(),
        flexbox: (function () {
          for (
            var e = d.createElement("div").style,
              t =
                "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(
                  " "
                ),
              i = 0;
            i < t.length;
            i += 1
          )
            if (t[i] in e) return !0;
          return !1;
        })(),
        observer: "MutationObserver" in s || "WebkitMutationObserver" in s,
        passiveListener: (function () {
          var e = !1;
          try {
            var t = Object.defineProperty({}, "passive", {
              get: function () {
                e = !0;
              },
            });
            s.addEventListener("testPassiveListener", null, t);
          } catch (e) {}
          return e;
        })(),
        gestures: "ongesturestart" in s,
      },
      u = function (e) {
        void 0 === e && (e = {});
        var t = this;
        (t.params = e),
          (t.eventsListeners = {}),
          t.params &&
            t.params.on &&
            Object.keys(t.params.on).forEach(function (e) {
              t.on(e, t.params.on[e]);
            });
      },
      p = { components: {} };
    (u.prototype.on = function (e, t) {
      var i = this;
      return (
        "function" != typeof t ||
          e.split(" ").forEach(function (e) {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e].push(t);
          }),
        i
      );
    }),
      (u.prototype.once = function (e, t) {
        function i() {
          for (var s = [], n = arguments.length; n--; ) s[n] = arguments[n];
          t.apply(a, s), a.off(e, i);
        }
        var a = this;
        return "function" != typeof t ? a : a.on(e, i);
      }),
      (u.prototype.off = function (e, t) {
        var i = this;
        return (
          e.split(" ").forEach(function (e) {
            void 0 === t
              ? (i.eventsListeners[e] = [])
              : i.eventsListeners[e].forEach(function (a, s) {
                  a === t && i.eventsListeners[e].splice(s, 1);
                });
          }),
          i
        );
      }),
      (u.prototype.emit = function () {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        var i = this,
          a,
          s,
          n;
        return i.eventsListeners
          ? ("string" == typeof e[0] || Array.isArray(e[0])
              ? ((a = e[0]), (s = e.slice(1, e.length)), (n = i))
              : ((a = e[0].events), (s = e[0].data), (n = e[0].context || i)),
            (Array.isArray(a) ? a : a.split(" ")).forEach(function (e) {
              if (i.eventsListeners[e]) {
                var t = [];
                i.eventsListeners[e].forEach(function (e) {
                  t.push(e);
                }),
                  t.forEach(function (e) {
                    e.apply(n, s);
                  });
              }
            }),
            i)
          : i;
      }),
      (u.prototype.useModulesParams = function (e) {
        var t = this;
        t.modules &&
          Object.keys(t.modules).forEach(function (i) {
            var a = t.modules[i];
            a.params && l.extend(e, a.params);
          });
      }),
      (u.prototype.useModules = function (e) {
        void 0 === e && (e = {});
        var t = this;
        t.modules &&
          Object.keys(t.modules).forEach(function (i) {
            var a = t.modules[i],
              s = e[i] || {};
            a.instance &&
              Object.keys(a.instance).forEach(function (e) {
                var i = a.instance[e];
                t[e] = "function" == typeof i ? i.bind(t) : i;
              }),
              a.on &&
                t.on &&
                Object.keys(a.on).forEach(function (e) {
                  t.on(e, a.on[e]);
                }),
              a.create && a.create.bind(t)(s);
          });
      }),
      (p.components.set = function (e) {
        var t = this;
        t.use && t.use(e);
      }),
      (u.installModule = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
          t[i] = arguments[i + 1];
        var a = this;
        a.prototype.modules || (a.prototype.modules = {});
        var s =
          e.name || Object.keys(a.prototype.modules).length + "_" + l.now();
        return (
          (a.prototype.modules[s] = e),
          e.proto &&
            Object.keys(e.proto).forEach(function (t) {
              a.prototype[t] = e.proto[t];
            }),
          e.static &&
            Object.keys(e.static).forEach(function (t) {
              a[t] = e.static[t];
            }),
          e.install && e.install.apply(a, t),
          a
        );
      }),
      (u.use = function (e) {
        for (var t = [], i = arguments.length - 1; i-- > 0; )
          t[i] = arguments[i + 1];
        var a = this;
        return Array.isArray(e)
          ? (e.forEach(function (e) {
              return a.installModule(e);
            }),
            a)
          : a.installModule.apply(a, [e].concat(t));
      }),
      Object.defineProperties(u, p);
    var h = {
        updateSize: function () {
          var e,
            t,
            i = this,
            a = i.$el;
          (e = void 0 !== i.params.width ? i.params.width : a[0].clientWidth),
            (t =
              void 0 !== i.params.height ? i.params.height : a[0].clientHeight),
            (0 === e && i.isHorizontal()) ||
              (0 === t && i.isVertical()) ||
              ((e =
                e -
                parseInt(a.css("padding-left"), 10) -
                parseInt(a.css("padding-right"), 10)),
              (t =
                t -
                parseInt(a.css("padding-top"), 10) -
                parseInt(a.css("padding-bottom"), 10)),
              l.extend(i, {
                width: e,
                height: t,
                size: i.isHorizontal() ? e : t,
              }));
        },
        updateSlides: function () {
          var e = this,
            t = e.params,
            i = e.$wrapperEl,
            a = e.size,
            s = e.rtl,
            n = e.wrongRTL,
            r = i.children("." + e.params.slideClass),
            o =
              e.virtual && t.virtual.enabled
                ? e.virtual.slides.length
                : r.length,
            d = [],
            u = [],
            p = [],
            h = t.slidesOffsetBefore;
          "function" == typeof h && (h = t.slidesOffsetBefore.call(e));
          var f = t.slidesOffsetAfter;
          "function" == typeof f && (f = t.slidesOffsetAfter.call(e));
          var v = o,
            m = e.snapGrid.length,
            g = e.snapGrid.length,
            b = t.spaceBetween,
            w = -h,
            y = 0,
            E = 0;
          if (void 0 !== a) {
            var x, S;
            "string" == typeof b &&
              b.indexOf("%") >= 0 &&
              (b = (parseFloat(b.replace("%", "")) / 100) * a),
              (e.virtualSize = -b),
              s
                ? r.css({ marginLeft: "", marginTop: "" })
                : r.css({ marginRight: "", marginBottom: "" }),
              t.slidesPerColumn > 1 &&
                ((x =
                  Math.floor(o / t.slidesPerColumn) ===
                  o / e.params.slidesPerColumn
                    ? o
                    : Math.ceil(o / t.slidesPerColumn) * t.slidesPerColumn),
                "auto" !== t.slidesPerView &&
                  "row" === t.slidesPerColumnFill &&
                  (x = Math.max(x, t.slidesPerView * t.slidesPerColumn)));
            for (
              var T,
                C = t.slidesPerColumn,
                $ = x / C,
                M = $ - (t.slidesPerColumn * $ - o),
                k = 0;
              k < o;
              k += 1
            ) {
              T = 0;
              var L = r.eq(k);
              if (t.slidesPerColumn > 1) {
                var z = void 0,
                  P = void 0,
                  I = void 0;
                "column" === t.slidesPerColumnFill
                  ? ((I = k - (P = Math.floor(k / C)) * C),
                    (P > M || (P === M && I === C - 1)) &&
                      (I += 1) >= C &&
                      ((I = 0), (P += 1)),
                    (z = P + (I * x) / C),
                    L.css({
                      "-webkit-box-ordinal-group": z,
                      "-moz-box-ordinal-group": z,
                      "-ms-flex-order": z,
                      "-webkit-order": z,
                      order: z,
                    }))
                  : (P = k - (I = Math.floor(k / $)) * $),
                  L.css(
                    "margin-" + (e.isHorizontal() ? "top" : "left"),
                    0 !== I && t.spaceBetween && t.spaceBetween + "px"
                  )
                    .attr("data-swiper-column", P)
                    .attr("data-swiper-row", I);
              }
              "none" !== L.css("display") &&
                ("auto" === t.slidesPerView
                  ? ((T = e.isHorizontal()
                      ? L.outerWidth(!0)
                      : L.outerHeight(!0)),
                    t.roundLengths && (T = Math.floor(T)))
                  : ((T = (a - (t.slidesPerView - 1) * b) / t.slidesPerView),
                    t.roundLengths && (T = Math.floor(T)),
                    r[k] &&
                      (e.isHorizontal()
                        ? (r[k].style.width = T + "px")
                        : (r[k].style.height = T + "px"))),
                r[k] && (r[k].swiperSlideSize = T),
                p.push(T),
                t.centeredSlides
                  ? ((w = w + T / 2 + y / 2 + b),
                    0 === y && 0 !== k && (w = w - a / 2 - b),
                    0 === k && (w = w - a / 2 - b),
                    Math.abs(w) < 0.001 && (w = 0),
                    E % t.slidesPerGroup == 0 && d.push(w),
                    u.push(w))
                  : (E % t.slidesPerGroup == 0 && d.push(w),
                    u.push(w),
                    (w = w + T + b)),
                (e.virtualSize += T + b),
                (y = T),
                (E += 1));
            }
            if (
              ((e.virtualSize = Math.max(e.virtualSize, a) + f),
              s &&
                n &&
                ("slide" === t.effect || "coverflow" === t.effect) &&
                i.css({ width: e.virtualSize + t.spaceBetween + "px" }),
              (c.flexbox && !t.setWrapperSize) ||
                (e.isHorizontal()
                  ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
                  : i.css({ height: e.virtualSize + t.spaceBetween + "px" })),
              t.slidesPerColumn > 1 &&
                ((e.virtualSize = (T + t.spaceBetween) * x),
                (e.virtualSize =
                  Math.ceil(e.virtualSize / t.slidesPerColumn) -
                  t.spaceBetween),
                e.isHorizontal()
                  ? i.css({ width: e.virtualSize + t.spaceBetween + "px" })
                  : i.css({ height: e.virtualSize + t.spaceBetween + "px" }),
                t.centeredSlides))
            ) {
              S = [];
              for (var A = 0; A < d.length; A += 1)
                d[A] < e.virtualSize + d[0] && S.push(d[A]);
              d = S;
            }
            if (!t.centeredSlides) {
              S = [];
              for (var D = 0; D < d.length; D += 1)
                d[D] <= e.virtualSize - a && S.push(d[D]);
              (d = S),
                Math.floor(e.virtualSize - a) - Math.floor(d[d.length - 1]) >
                  1 && d.push(e.virtualSize - a);
            }
            0 === d.length && (d = [0]),
              0 !== t.spaceBetween &&
                (e.isHorizontal()
                  ? s
                    ? r.css({ marginLeft: b + "px" })
                    : r.css({ marginRight: b + "px" })
                  : r.css({ marginBottom: b + "px" })),
              l.extend(e, {
                slides: r,
                snapGrid: d,
                slidesGrid: u,
                slidesSizesGrid: p,
              }),
              o !== v && e.emit("slidesLengthChange"),
              d.length !== m && e.emit("snapGridLengthChange"),
              u.length !== g && e.emit("slidesGridLengthChange"),
              (t.watchSlidesProgress || t.watchSlidesVisibility) &&
                e.updateSlidesOffset();
          }
        },
        updateAutoHeight: function () {
          var e,
            t = this,
            i = [],
            a = 0;
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            for (e = 0; e < Math.ceil(t.params.slidesPerView); e += 1) {
              var s = t.activeIndex + e;
              if (s > t.slides.length) break;
              i.push(t.slides.eq(s)[0]);
            }
          else i.push(t.slides.eq(t.activeIndex)[0]);
          for (e = 0; e < i.length; e += 1)
            if (void 0 !== i[e]) {
              var n = i[e].offsetHeight;
              a = n > a ? n : a;
            }
          a && t.$wrapperEl.css("height", a + "px");
        },
        updateSlidesOffset: function () {
          for (var e = this, t = e.slides, i = 0; i < t.length; i += 1)
            t[i].swiperSlideOffset = e.isHorizontal()
              ? t[i].offsetLeft
              : t[i].offsetTop;
        },
        updateSlidesProgress: function (e) {
          void 0 === e && (e = this.translate || 0);
          var t = this,
            i = t.params,
            a = t.slides,
            s = t.rtl;
          if (0 !== a.length) {
            void 0 === a[0].swiperSlideOffset && t.updateSlidesOffset();
            var n = -e;
            s && (n = e), a.removeClass(i.slideVisibleClass);
            for (var r = 0; r < a.length; r += 1) {
              var o = a[r],
                l =
                  (n +
                    (i.centeredSlides ? t.minTranslate() : 0) -
                    o.swiperSlideOffset) /
                  (o.swiperSlideSize + i.spaceBetween);
              if (i.watchSlidesVisibility) {
                var d = -(n - o.swiperSlideOffset),
                  c = d + t.slidesSizesGrid[r];
                ((d >= 0 && d < t.size) ||
                  (c > 0 && c <= t.size) ||
                  (d <= 0 && c >= t.size)) &&
                  a.eq(r).addClass(i.slideVisibleClass);
              }
              o.progress = s ? -l : l;
            }
          }
        },
        updateProgress: function (e) {
          void 0 === e && (e = this.translate || 0);
          var t = this,
            i = t.params,
            a = t.maxTranslate() - t.minTranslate(),
            s = t.progress,
            n = t.isBeginning,
            r = t.isEnd,
            o = n,
            d = r;
          0 === a
            ? ((s = 0), (n = !0), (r = !0))
            : ((n = (s = (e - t.minTranslate()) / a) <= 0), (r = s >= 1)),
            l.extend(t, { progress: s, isBeginning: n, isEnd: r }),
            (i.watchSlidesProgress || i.watchSlidesVisibility) &&
              t.updateSlidesProgress(e),
            n && !o && t.emit("reachBeginning toEdge"),
            r && !d && t.emit("reachEnd toEdge"),
            ((o && !n) || (d && !r)) && t.emit("fromEdge"),
            t.emit("progress", s);
        },
        updateSlidesClasses: function () {
          var e = this,
            t = e.slides,
            i = e.params,
            a = e.$wrapperEl,
            s = e.activeIndex,
            n = e.realIndex,
            r = e.virtual && i.virtual.enabled,
            o;
          t.removeClass(
            i.slideActiveClass +
              " " +
              i.slideNextClass +
              " " +
              i.slidePrevClass +
              " " +
              i.slideDuplicateActiveClass +
              " " +
              i.slideDuplicateNextClass +
              " " +
              i.slideDuplicatePrevClass
          ),
            (o = r
              ? e.$wrapperEl.find(
                  "." + i.slideClass + '[data-swiper-slide-index="' + s + '"]'
                )
              : t.eq(s)).addClass(i.slideActiveClass),
            i.loop &&
              (o.hasClass(i.slideDuplicateClass)
                ? a
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        n +
                        '"]'
                    )
                    .addClass(i.slideDuplicateActiveClass)
                : a
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        n +
                        '"]'
                    )
                    .addClass(i.slideDuplicateActiveClass));
          var l = o
            .nextAll("." + i.slideClass)
            .eq(0)
            .addClass(i.slideNextClass);
          i.loop && 0 === l.length && (l = t.eq(0)).addClass(i.slideNextClass);
          var d = o
            .prevAll("." + i.slideClass)
            .eq(0)
            .addClass(i.slidePrevClass);
          i.loop && 0 === d.length && (d = t.eq(-1)).addClass(i.slidePrevClass),
            i.loop &&
              (l.hasClass(i.slideDuplicateClass)
                ? a
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        l.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicateNextClass)
                : a
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        l.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicateNextClass),
              d.hasClass(i.slideDuplicateClass)
                ? a
                    .children(
                      "." +
                        i.slideClass +
                        ":not(." +
                        i.slideDuplicateClass +
                        ')[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicatePrevClass)
                : a
                    .children(
                      "." +
                        i.slideClass +
                        "." +
                        i.slideDuplicateClass +
                        '[data-swiper-slide-index="' +
                        d.attr("data-swiper-slide-index") +
                        '"]'
                    )
                    .addClass(i.slideDuplicatePrevClass));
        },
        updateActiveIndex: function (e) {
          var t,
            i = this,
            a = i.rtl ? i.translate : -i.translate,
            s = i.slidesGrid,
            n = i.snapGrid,
            r = i.params,
            o = i.activeIndex,
            d = i.realIndex,
            c = i.snapIndex,
            u = e;
          if (void 0 === u) {
            for (var p = 0; p < s.length; p += 1)
              void 0 !== s[p + 1]
                ? a >= s[p] && a < s[p + 1] - (s[p + 1] - s[p]) / 2
                  ? (u = p)
                  : a >= s[p] && a < s[p + 1] && (u = p + 1)
                : a >= s[p] && (u = p);
            r.normalizeSlideIndex && (u < 0 || void 0 === u) && (u = 0);
          }
          if (
            ((t =
              n.indexOf(a) >= 0
                ? n.indexOf(a)
                : Math.floor(u / r.slidesPerGroup)) >= n.length &&
              (t = n.length - 1),
            u !== o)
          ) {
            var h = parseInt(
              i.slides.eq(u).attr("data-swiper-slide-index") || u,
              10
            );
            l.extend(i, {
              snapIndex: t,
              realIndex: h,
              previousIndex: o,
              activeIndex: u,
            }),
              i.emit("activeIndexChange"),
              i.emit("snapIndexChange"),
              d !== h && i.emit("realIndexChange"),
              i.emit("slideChange");
          } else t !== c && ((i.snapIndex = t), i.emit("snapIndexChange"));
        },
        updateClickedSlide: function (t) {
          var i = this,
            a = i.params,
            s = e(t.target).closest("." + a.slideClass)[0],
            n = !1;
          if (s)
            for (var r = 0; r < i.slides.length; r += 1)
              i.slides[r] === s && (n = !0);
          if (!s || !n)
            return (i.clickedSlide = void 0), void (i.clickedIndex = void 0);
          (i.clickedSlide = s),
            i.virtual && i.params.virtual.enabled
              ? (i.clickedIndex = parseInt(
                  e(s).attr("data-swiper-slide-index"),
                  10
                ))
              : (i.clickedIndex = e(s).index()),
            a.slideToClickedSlide &&
              void 0 !== i.clickedIndex &&
              i.clickedIndex !== i.activeIndex &&
              i.slideToClickedSlide();
        },
      },
      f = {
        getTranslate: function (e) {
          void 0 === e && (e = this.isHorizontal() ? "x" : "y");
          var t = this,
            i = t.params,
            a = t.rtl,
            s = t.translate,
            n = t.$wrapperEl;
          if (i.virtualTranslate) return a ? -s : s;
          var r = l.getTranslate(n[0], e);
          return a && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
          var i = this,
            a = i.rtl,
            s = i.params,
            n = i.$wrapperEl,
            r = i.progress,
            o = 0,
            l = 0;
          i.isHorizontal() ? (o = a ? -e : e) : (l = e),
            s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
            s.virtualTranslate ||
              (c.transforms3d
                ? n.transform("translate3d(" + o + "px, " + l + "px, 0px)")
                : n.transform("translate(" + o + "px, " + l + "px)")),
            (i.translate = i.isHorizontal() ? o : l);
          var d = i.maxTranslate() - i.minTranslate();
          (0 === d ? 0 : (e - i.minTranslate()) / d) !== r &&
            i.updateProgress(e),
            i.emit("setTranslate", i.translate, t);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
      },
      v = {
        setTransition: function (e, t) {
          var i = this;
          i.$wrapperEl.transition(e), i.emit("setTransition", e, t);
        },
        transitionStart: function (e) {
          void 0 === e && (e = !0);
          var t = this,
            i = t.activeIndex,
            a = t.params,
            s = t.previousIndex;
          a.autoHeight && t.updateAutoHeight(),
            t.emit("transitionStart"),
            e &&
              i !== s &&
              (t.emit("slideChangeTransitionStart"),
              i > s
                ? t.emit("slideNextTransitionStart")
                : t.emit("slidePrevTransitionStart"));
        },
        transitionEnd: function (e) {
          void 0 === e && (e = !0);
          var t = this,
            i = t.activeIndex,
            a = t.previousIndex;
          (t.animating = !1),
            t.setTransition(0),
            t.emit("transitionEnd"),
            e &&
              i !== a &&
              (t.emit("slideChangeTransitionEnd"),
              i > a
                ? t.emit("slideNextTransitionEnd")
                : t.emit("slidePrevTransitionEnd"));
        },
      },
      m = {
        isSafari: (function () {
          var e = s.navigator.userAgent.toLowerCase();
          return (
            e.indexOf("safari") >= 0 &&
            e.indexOf("chrome") < 0 &&
            e.indexOf("android") < 0
          );
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          s.navigator.userAgent
        ),
        ie: s.navigator.pointerEnabled || s.navigator.msPointerEnabled,
        ieTouch:
          (s.navigator.msPointerEnabled && s.navigator.msMaxTouchPoints > 1) ||
          (s.navigator.pointerEnabled && s.navigator.maxTouchPoints > 1),
        lteIE9: (function () {
          var e = d.createElement("div");
          return (
            (e.innerHTML = "\x3c!--[if lte IE 9]><i></i><![endif]--\x3e"),
            1 === e.getElementsByTagName("i").length
          );
        })(),
      },
      g = {
        slideTo: function (e, t, i, a) {
          void 0 === e && (e = 0),
            void 0 === t && (t = this.params.speed),
            void 0 === i && (i = !0);
          var s = this,
            n = e;
          n < 0 && (n = 0);
          var r = s.params,
            o = s.snapGrid,
            l = s.slidesGrid,
            d = s.previousIndex,
            c = s.activeIndex,
            u = s.rtl,
            p = s.$wrapperEl,
            h = Math.floor(n / r.slidesPerGroup);
          h >= o.length && (h = o.length - 1),
            (c || r.initialSlide || 0) === (d || 0) &&
              i &&
              s.emit("beforeSlideChangeStart");
          var f = -o[h];
          if ((s.updateProgress(f), r.normalizeSlideIndex))
            for (var v = 0; v < l.length; v += 1)
              -Math.floor(100 * f) >= Math.floor(100 * l[v]) && (n = v);
          return !(
            (!s.allowSlideNext && f < s.translate && f < s.minTranslate()) ||
            (!s.allowSlidePrev &&
              f > s.translate &&
              f > s.maxTranslate() &&
              (c || 0) !== n) ||
            ((u && -f === s.translate) || (!u && f === s.translate)
              ? (s.updateActiveIndex(n),
                r.autoHeight && s.updateAutoHeight(),
                s.updateSlidesClasses(),
                "slide" !== r.effect && s.setTranslate(f),
                1)
              : (0 === t || m.lteIE9
                  ? (s.setTransition(0),
                    s.setTranslate(f),
                    s.updateActiveIndex(n),
                    s.updateSlidesClasses(),
                    s.emit("beforeTransitionStart", t, a),
                    s.transitionStart(i),
                    s.transitionEnd(i))
                  : (s.setTransition(t),
                    s.setTranslate(f),
                    s.updateActiveIndex(n),
                    s.updateSlidesClasses(),
                    s.emit("beforeTransitionStart", t, a),
                    s.transitionStart(i),
                    s.animating ||
                      ((s.animating = !0),
                      p.transitionEnd(function () {
                        s && !s.destroyed && s.transitionEnd(i);
                      }))),
                0))
          );
        },
        slideNext: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var a = this,
            s = a.params,
            n = a.animating;
          return s.loop
            ? !n &&
                (a.loopFix(),
                (a._clientLeft = a.$wrapperEl[0].clientLeft),
                a.slideTo(a.activeIndex + s.slidesPerGroup, e, t, i))
            : a.slideTo(a.activeIndex + s.slidesPerGroup, e, t, i);
        },
        slidePrev: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var a = this,
            s = a.params,
            n = a.animating;
          return s.loop
            ? !n &&
                (a.loopFix(),
                (a._clientLeft = a.$wrapperEl[0].clientLeft),
                a.slideTo(a.activeIndex - 1, e, t, i))
            : a.slideTo(a.activeIndex - 1, e, t, i);
        },
        slideReset: function (e, t, i) {
          void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
          var a = this;
          return a.slideTo(a.activeIndex, e, t, i);
        },
        slideToClickedSlide: function () {
          var t,
            i = this,
            a = i.params,
            s = i.$wrapperEl,
            n =
              "auto" === a.slidesPerView
                ? i.slidesPerViewDynamic()
                : a.slidesPerView,
            r = i.clickedIndex;
          if (a.loop) {
            if (i.animating) return;
            (t = parseInt(
              e(i.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              a.centeredSlides
                ? r < i.loopedSlides - n / 2 ||
                  r > i.slides.length - i.loopedSlides + n / 2
                  ? (i.loopFix(),
                    (r = s
                      .children(
                        "." +
                          a.slideClass +
                          '[data-swiper-slide-index="' +
                          t +
                          '"]:not(.' +
                          a.slideDuplicateClass +
                          ")"
                      )
                      .eq(0)
                      .index()),
                    l.nextTick(function () {
                      i.slideTo(r);
                    }))
                  : i.slideTo(r)
                : r > i.slides.length - n
                ? (i.loopFix(),
                  (r = s
                    .children(
                      "." +
                        a.slideClass +
                        '[data-swiper-slide-index="' +
                        t +
                        '"]:not(.' +
                        a.slideDuplicateClass +
                        ")"
                    )
                    .eq(0)
                    .index()),
                  l.nextTick(function () {
                    i.slideTo(r);
                  }))
                : i.slideTo(r);
          } else i.slideTo(r);
        },
      },
      b = {
        loopCreate: function () {
          var t = this,
            i = t.params,
            a = t.$wrapperEl;
          a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
          var s = a.children("." + i.slideClass);
          if (i.loopFillGroupWithBlank) {
            var n = i.slidesPerGroup - (s.length % i.slidesPerGroup);
            if (n !== i.slidesPerGroup) {
              for (var r = 0; r < n; r += 1) {
                var o = e(d.createElement("div")).addClass(
                  i.slideClass + " " + i.slideBlankClass
                );
                a.append(o);
              }
              s = a.children("." + i.slideClass);
            }
          }
          "auto" !== i.slidesPerView ||
            i.loopedSlides ||
            (i.loopedSlides = s.length),
            (t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10)),
            (t.loopedSlides += i.loopAdditionalSlides),
            t.loopedSlides > s.length && (t.loopedSlides = s.length);
          var l = [],
            c = [];
          s.each(function (i, a) {
            var n = e(a);
            i < t.loopedSlides && c.push(a),
              i < s.length && i >= s.length - t.loopedSlides && l.push(a),
              n.attr("data-swiper-slide-index", i);
          });
          for (var u = 0; u < c.length; u += 1)
            a.append(e(c[u].cloneNode(!0)).addClass(i.slideDuplicateClass));
          for (var p = l.length - 1; p >= 0; p -= 1)
            a.prepend(e(l[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
          var e,
            t = this,
            i = t.params,
            a = t.activeIndex,
            s = t.slides,
            n = t.loopedSlides,
            r = t.allowSlidePrev,
            o = t.allowSlideNext;
          (t.allowSlidePrev = !0),
            (t.allowSlideNext = !0),
            a < n
              ? ((e = s.length - 3 * n + a), (e += n), t.slideTo(e, 0, !1, !0))
              : (("auto" === i.slidesPerView && a >= 2 * n) ||
                  a > s.length - 2 * i.slidesPerView) &&
                ((e = -s.length + a + n), (e += n), t.slideTo(e, 0, !1, !0)),
            (t.allowSlidePrev = r),
            (t.allowSlideNext = o);
        },
        loopDestroy: function () {
          var e = this,
            t = e.$wrapperEl,
            i = e.params,
            a = e.slides;
          t.children("." + i.slideClass + "." + i.slideDuplicateClass).remove(),
            a.removeAttr("data-swiper-slide-index");
        },
      },
      w = {
        setGrabCursor: function (e) {
          var t = this;
          if (!c.touch && t.params.simulateTouch) {
            var i = t.el;
            (i.style.cursor = "move"),
              (i.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"),
              (i.style.cursor = e ? "-moz-grabbin" : "-moz-grab"),
              (i.style.cursor = e ? "grabbing" : "grab");
          }
        },
        unsetGrabCursor: function () {
          var e;
          c.touch || (this.el.style.cursor = "");
        },
      },
      y = {
        appendSlide: function (e) {
          var t = this,
            i = t.$wrapperEl,
            a = t.params;
          if (
            (a.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
          )
            for (var s = 0; s < e.length; s += 1) e[s] && i.append(e[s]);
          else i.append(e);
          a.loop && t.loopCreate(), (a.observer && c.observer) || t.update();
        },
        prependSlide: function (e) {
          var t = this,
            i = t.params,
            a = t.$wrapperEl,
            s = t.activeIndex;
          i.loop && t.loopDestroy();
          var n = s + 1;
          if ("object" == typeof e && "length" in e) {
            for (var r = 0; r < e.length; r += 1) e[r] && a.prepend(e[r]);
            n = s + e.length;
          } else a.prepend(e);
          i.loop && t.loopCreate(),
            (i.observer && c.observer) || t.update(),
            t.slideTo(n, 0, !1);
        },
        removeSlide: function (e) {
          var t = this,
            i = t.params,
            a = t.$wrapperEl,
            s = t.activeIndex;
          i.loop &&
            (t.loopDestroy(), (t.slides = a.children("." + i.slideClass)));
          var n,
            r = s;
          if ("object" == typeof e && "length" in e) {
            for (var o = 0; o < e.length; o += 1)
              (n = e[o]),
                t.slides[n] && t.slides.eq(n).remove(),
                n < r && (r -= 1);
            r = Math.max(r, 0);
          } else
            (n = e),
              t.slides[n] && t.slides.eq(n).remove(),
              n < r && (r -= 1),
              (r = Math.max(r, 0));
          i.loop && t.loopCreate(),
            (i.observer && c.observer) || t.update(),
            i.loop ? t.slideTo(r + t.loopedSlides, 0, !1) : t.slideTo(r, 0, !1);
        },
        removeAllSlides: function () {
          for (var e = this, t = [], i = 0; i < e.slides.length; i += 1)
            t.push(i);
          e.removeSlide(t);
        },
      },
      E = (function () {
        var e = s.navigator.userAgent,
          t = {
            ios: !1,
            android: !1,
            androidChrome: !1,
            desktop: !1,
            windows: !1,
            iphone: !1,
            ipod: !1,
            ipad: !1,
            cordova: s.cordova || s.phonegap,
            phonegap: s.cordova || s.phonegap,
          },
          i = e.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
          a = e.match(/(Android);?[\s\/]+([\d.]+)?/),
          n = e.match(/(iPad).*OS\s([\d_]+)/),
          r = e.match(/(iPod)(.*OS\s([\d_]+))?/),
          o = !n && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        if (
          (i && ((t.os = "windows"), (t.osVersion = i[2]), (t.windows = !0)),
          a &&
            !i &&
            ((t.os = "android"),
            (t.osVersion = a[2]),
            (t.android = !0),
            (t.androidChrome = e.toLowerCase().indexOf("chrome") >= 0)),
          (n || o || r) && ((t.os = "ios"), (t.ios = !0)),
          o && !r && ((t.osVersion = o[2].replace(/_/g, ".")), (t.iphone = !0)),
          n && ((t.osVersion = n[2].replace(/_/g, ".")), (t.ipad = !0)),
          r &&
            ((t.osVersion = r[3] ? r[3].replace(/_/g, ".") : null),
            (t.iphone = !0)),
          t.ios &&
            t.osVersion &&
            e.indexOf("Version/") >= 0 &&
            "10" === t.osVersion.split(".")[0] &&
            (t.osVersion = e.toLowerCase().split("version/")[1].split(" ")[0]),
          (t.desktop = !(t.os || t.android || t.webView)),
          (t.webView = (o || n || r) && e.match(/.*AppleWebKit(?!.*Safari)/i)),
          t.os && "ios" === t.os)
        ) {
          var l = t.osVersion.split("."),
            c = d.querySelector('meta[name="viewport"]');
          t.minimalUi =
            !t.webView &&
            (r || o) &&
            (1 * l[0] == 7 ? 1 * l[1] >= 1 : 1 * l[0] > 7) &&
            c &&
            c.getAttribute("content").indexOf("minimal-ui") >= 0;
        }
        return (t.pixelRatio = s.devicePixelRatio || 1), t;
      })(),
      x = function (t) {
        var i = this,
          a = i.touchEventsData,
          s = i.params,
          n = i.touches,
          r = t;
        if (
          (r.originalEvent && (r = r.originalEvent),
          (a.isTouchEvent = "touchstart" === r.type),
          (a.isTouchEvent || !("which" in r) || 3 !== r.which) &&
            (!a.isTouched || !a.isMoved))
        )
          if (s.noSwiping && e(r.target).closest("." + s.noSwipingClass)[0])
            i.allowClick = !0;
          else if (!s.swipeHandler || e(r).closest(s.swipeHandler)[0]) {
            (n.currentX =
              "touchstart" === r.type ? r.targetTouches[0].pageX : r.pageX),
              (n.currentY =
                "touchstart" === r.type ? r.targetTouches[0].pageY : r.pageY);
            var o = n.currentX,
              c = n.currentY;
            if (
              !(
                E.ios &&
                !E.cordova &&
                s.iOSEdgeSwipeDetection &&
                o <= s.iOSEdgeSwipeThreshold &&
                o >= window.screen.width - s.iOSEdgeSwipeThreshold
              )
            ) {
              if (
                (l.extend(a, {
                  isTouched: !0,
                  isMoved: !1,
                  allowTouchCallbacks: !0,
                  isScrolling: void 0,
                  startMoving: void 0,
                }),
                (n.startX = o),
                (n.startY = c),
                (a.touchStartTime = l.now()),
                (i.allowClick = !0),
                i.updateSize(),
                (i.swipeDirection = void 0),
                s.threshold > 0 && (a.allowThresholdMove = !1),
                "touchstart" !== r.type)
              ) {
                var u = !0;
                e(r.target).is(a.formElements) && (u = !1),
                  d.activeElement &&
                    e(d.activeElement).is(a.formElements) &&
                    d.activeElement.blur(),
                  u && i.allowTouchMove && r.preventDefault();
              }
              i.emit("touchStart", r);
            }
          }
      },
      S = function (t) {
        var i = this,
          a = i.touchEventsData,
          s = i.params,
          n = i.touches,
          r = i.rtl,
          o = t;
        if (
          (o.originalEvent && (o = o.originalEvent),
          !a.isTouchEvent || "mousemove" !== o.type)
        ) {
          var c = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
            u = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
          if (o.preventedByNestedSwiper)
            return (n.startX = c), void (n.startY = u);
          if (!i.allowTouchMove)
            return (
              (i.allowClick = !1),
              void (
                a.isTouched &&
                (l.extend(n, {
                  startX: c,
                  startY: u,
                  currentX: c,
                  currentY: u,
                }),
                (a.touchStartTime = l.now()))
              )
            );
          if (a.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
            if (i.isVertical()) {
              if (
                (u < n.startY && i.translate <= i.maxTranslate()) ||
                (u > n.startY && i.translate >= i.minTranslate())
              )
                return (a.isTouched = !1), void (a.isMoved = !1);
            } else if (
              (c < n.startX && i.translate <= i.maxTranslate()) ||
              (c > n.startX && i.translate >= i.minTranslate())
            )
              return;
          if (
            a.isTouchEvent &&
            d.activeElement &&
            o.target === d.activeElement &&
            e(o.target).is(a.formElements)
          )
            return (a.isMoved = !0), void (i.allowClick = !1);
          if (
            (a.allowTouchCallbacks && i.emit("touchMove", o),
            !(o.targetTouches && o.targetTouches.length > 1))
          ) {
            (n.currentX = c), (n.currentY = u);
            var p = n.currentX - n.startX,
              h = n.currentY - n.startY,
              f;
            if (void 0 === a.isScrolling)
              (i.isHorizontal() && n.currentY === n.startY) ||
              (i.isVertical() && n.currentX === n.startX)
                ? (a.isScrolling = !1)
                : p * p + h * h >= 25 &&
                  ((f = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
                  (a.isScrolling = i.isHorizontal()
                    ? f > s.touchAngle
                    : 90 - f > s.touchAngle));
            if (
              (a.isScrolling && i.emit("touchMoveOpposite", o),
              "undefined" == typeof startMoving &&
                ((n.currentX === n.startX && n.currentY === n.startY) ||
                  (a.startMoving = !0)),
              a.isTouched)
            )
              if (a.isScrolling) a.isTouched = !1;
              else if (a.startMoving) {
                (i.allowClick = !1),
                  o.preventDefault(),
                  s.touchMoveStopPropagation &&
                    !s.nested &&
                    o.stopPropagation(),
                  a.isMoved ||
                    (s.loop && i.loopFix(),
                    (a.startTranslate = i.getTranslate()),
                    i.setTransition(0),
                    i.animating &&
                      i.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                    (a.allowMomentumBounce = !1),
                    !s.grabCursor ||
                      (!0 !== i.allowSlideNext && !0 !== i.allowSlidePrev) ||
                      i.setGrabCursor(!0),
                    i.emit("sliderFirstMove", o)),
                  i.emit("sliderMove", o),
                  (a.isMoved = !0);
                var v = i.isHorizontal() ? p : h;
                (n.diff = v),
                  (v *= s.touchRatio),
                  r && (v = -v),
                  (i.swipeDirection = v > 0 ? "prev" : "next"),
                  (a.currentTranslate = v + a.startTranslate);
                var m = !0,
                  g = s.resistanceRatio;
                if (
                  (s.touchReleaseOnEdges && (g = 0),
                  v > 0 && a.currentTranslate > i.minTranslate()
                    ? ((m = !1),
                      s.resistance &&
                        (a.currentTranslate =
                          i.minTranslate() -
                          1 +
                          Math.pow(
                            -i.minTranslate() + a.startTranslate + v,
                            g
                          )))
                    : v < 0 &&
                      a.currentTranslate < i.maxTranslate() &&
                      ((m = !1),
                      s.resistance &&
                        (a.currentTranslate =
                          i.maxTranslate() +
                          1 -
                          Math.pow(
                            i.maxTranslate() - a.startTranslate - v,
                            g
                          ))),
                  m && (o.preventedByNestedSwiper = !0),
                  !i.allowSlideNext &&
                    "next" === i.swipeDirection &&
                    a.currentTranslate < a.startTranslate &&
                    (a.currentTranslate = a.startTranslate),
                  !i.allowSlidePrev &&
                    "prev" === i.swipeDirection &&
                    a.currentTranslate > a.startTranslate &&
                    (a.currentTranslate = a.startTranslate),
                  s.threshold > 0)
                ) {
                  if (!(Math.abs(v) > s.threshold || a.allowThresholdMove))
                    return void (a.currentTranslate = a.startTranslate);
                  if (!a.allowThresholdMove)
                    return (
                      (a.allowThresholdMove = !0),
                      (n.startX = n.currentX),
                      (n.startY = n.currentY),
                      (a.currentTranslate = a.startTranslate),
                      void (n.diff = i.isHorizontal()
                        ? n.currentX - n.startX
                        : n.currentY - n.startY)
                    );
                }
                s.followFinger &&
                  ((s.freeMode ||
                    s.watchSlidesProgress ||
                    s.watchSlidesVisibility) &&
                    (i.updateActiveIndex(), i.updateSlidesClasses()),
                  s.freeMode &&
                    (0 === a.velocities.length &&
                      a.velocities.push({
                        position: n[i.isHorizontal() ? "startX" : "startY"],
                        time: a.touchStartTime,
                      }),
                    a.velocities.push({
                      position: n[i.isHorizontal() ? "currentX" : "currentY"],
                      time: l.now(),
                    })),
                  i.updateProgress(a.currentTranslate),
                  i.setTranslate(a.currentTranslate));
              }
          }
        }
      },
      T = function (e) {
        var t = this,
          i = t.touchEventsData,
          a = t.params,
          s = t.touches,
          n = t.rtl,
          r = t.$wrapperEl,
          o = t.slidesGrid,
          d = t.snapGrid,
          c = e;
        if (
          (c.originalEvent && (c = c.originalEvent),
          i.allowTouchCallbacks && t.emit("touchEnd", c),
          (i.allowTouchCallbacks = !1),
          i.isTouched)
        ) {
          a.grabCursor &&
            i.isMoved &&
            i.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          var u = l.now(),
            p = u - i.touchStartTime,
            h;
          if (
            (t.allowClick &&
              (t.updateClickedSlide(c),
              t.emit("tap", c),
              p < 300 &&
                u - i.lastClickTime > 300 &&
                (i.clickTimeout && clearTimeout(i.clickTimeout),
                (i.clickTimeout = l.nextTick(function () {
                  t && !t.destroyed && t.emit("click", c);
                }, 300))),
              p < 300 &&
                u - i.lastClickTime < 300 &&
                (i.clickTimeout && clearTimeout(i.clickTimeout),
                t.emit("doubleTap", c))),
            (i.lastClickTime = l.now()),
            l.nextTick(function () {
              t.destroyed || (t.allowClick = !0);
            }),
            !i.isTouched ||
              !i.isMoved ||
              !t.swipeDirection ||
              0 === s.diff ||
              i.currentTranslate === i.startTranslate)
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
          if (
            ((i.isTouched = !1),
            (i.isMoved = !1),
            (h = a.followFinger
              ? n
                ? t.translate
                : -t.translate
              : -i.currentTranslate),
            a.freeMode)
          ) {
            if (h < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (h > -t.maxTranslate())
              return void (t.slides.length < d.length
                ? t.slideTo(d.length - 1)
                : t.slideTo(t.slides.length - 1));
            if (a.freeModeMomentum) {
              if (i.velocities.length > 1) {
                var f = i.velocities.pop(),
                  v = i.velocities.pop(),
                  m = f.position - v.position,
                  g = f.time - v.time;
                (t.velocity = m / g),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < a.freeModeMinimumVelocity &&
                    (t.velocity = 0),
                  (g > 150 || l.now() - f.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= a.freeModeMomentumVelocityRatio),
                (i.velocities.length = 0);
              var b = 1e3 * a.freeModeMomentumRatio,
                w = t.velocity * b,
                y = t.translate + w;
              n && (y = -y);
              var E,
                x = !1,
                S = 20 * Math.abs(t.velocity) * a.freeModeMomentumBounceRatio;
              if (y < t.maxTranslate())
                a.freeModeMomentumBounce
                  ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                    (E = t.maxTranslate()),
                    (x = !0),
                    (i.allowMomentumBounce = !0))
                  : (y = t.maxTranslate());
              else if (y > t.minTranslate())
                a.freeModeMomentumBounce
                  ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                    (E = t.minTranslate()),
                    (x = !0),
                    (i.allowMomentumBounce = !0))
                  : (y = t.minTranslate());
              else if (a.freeModeSticky) {
                for (var T, C = 0; C < d.length; C += 1)
                  if (d[C] > -y) {
                    T = C;
                    break;
                  }
                y = -(y =
                  Math.abs(d[T] - y) < Math.abs(d[T - 1] - y) ||
                  "next" === t.swipeDirection
                    ? d[T]
                    : d[T - 1]);
              }
              if (0 !== t.velocity)
                b = n
                  ? Math.abs((-y - t.translate) / t.velocity)
                  : Math.abs((y - t.translate) / t.velocity);
              else if (a.freeModeSticky) return void t.slideReset();
              a.freeModeMomentumBounce && x
                ? (t.updateProgress(E),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(),
                  (t.animating = !0),
                  r.transitionEnd(function () {
                    t &&
                      !t.destroyed &&
                      i.allowMomentumBounce &&
                      (t.emit("momentumBounce"),
                      t.setTransition(a.speed),
                      t.setTranslate(E),
                      r.transitionEnd(function () {
                        t && !t.destroyed && t.transitionEnd();
                      }));
                  }))
                : t.velocity
                ? (t.updateProgress(y),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(),
                  t.animating ||
                    ((t.animating = !0),
                    r.transitionEnd(function () {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : t.updateProgress(y),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            }
            (!a.freeModeMomentum || p >= a.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          } else {
            for (
              var $ = 0, M = t.slidesSizesGrid[0], k = 0;
              k < o.length;
              k += a.slidesPerGroup
            )
              void 0 !== o[k + a.slidesPerGroup]
                ? h >= o[k] &&
                  h < o[k + a.slidesPerGroup] &&
                  (($ = k), (M = o[k + a.slidesPerGroup] - o[k]))
                : h >= o[k] &&
                  (($ = k), (M = o[o.length - 1] - o[o.length - 2]));
            var L = (h - o[$]) / M;
            if (p > a.longSwipesMs) {
              if (!a.longSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection &&
                (L >= a.longSwipesRatio
                  ? t.slideTo($ + a.slidesPerGroup)
                  : t.slideTo($)),
                "prev" === t.swipeDirection &&
                  (L > 1 - a.longSwipesRatio
                    ? t.slideTo($ + a.slidesPerGroup)
                    : t.slideTo($));
            } else {
              if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
              "next" === t.swipeDirection && t.slideTo($ + a.slidesPerGroup),
                "prev" === t.swipeDirection && t.slideTo($);
            }
          }
        }
      },
      C = function () {
        var e = this,
          t = e.params,
          i = e.el;
        if (!i || 0 !== i.offsetWidth) {
          t.breakpoints && e.setBreakpoint();
          var a = e.allowSlideNext,
            s = e.allowSlidePrev;
          if (
            ((e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            t.freeMode)
          ) {
            var n = Math.min(
              Math.max(e.translate, e.maxTranslate()),
              e.minTranslate()
            );
            e.setTranslate(n),
              e.updateActiveIndex(),
              e.updateSlidesClasses(),
              t.autoHeight && e.updateAutoHeight();
          } else
            e.updateSlidesClasses(),
              ("auto" === t.slidesPerView || t.slidesPerView > 1) &&
              e.isEnd &&
              !e.params.centeredSlides
                ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                : e.slideTo(e.activeIndex, 0, !1, !0);
          (e.allowSlidePrev = s), (e.allowSlideNext = a);
        }
      },
      $ = function (e) {
        var t = this;
        t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation()));
      },
      M = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !0,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
      },
      k = {
        update: h,
        translate: f,
        transition: v,
        slide: g,
        loop: b,
        grabCursor: w,
        manipulation: y,
        events: {
          attachEvents: function () {
            var e = this,
              t = e.params,
              i = e.touchEvents,
              a = e.el,
              s = e.wrapperEl;
            (e.onTouchStart = x.bind(e)),
              (e.onTouchMove = S.bind(e)),
              (e.onTouchEnd = T.bind(e)),
              (e.onClick = $.bind(e));
            var n = "container" === t.touchEventsTarget ? a : s,
              r = !!t.nested;
            if (m.ie)
              n.addEventListener(i.start, e.onTouchStart, !1),
                (c.touch ? n : d).addEventListener(i.move, e.onTouchMove, r),
                (c.touch ? n : d).addEventListener(i.end, e.onTouchEnd, !1);
            else {
              if (c.touch) {
                var o = !(
                  "touchstart" !== i.start ||
                  !c.passiveListener ||
                  !t.passiveListeners
                ) && { passive: !0, capture: !1 };
                n.addEventListener(i.start, e.onTouchStart, o),
                  n.addEventListener(
                    i.move,
                    e.onTouchMove,
                    c.passiveListener ? { passive: !1, capture: r } : r
                  ),
                  n.addEventListener(i.end, e.onTouchEnd, o);
              }
              ((t.simulateTouch && !E.ios && !E.android) ||
                (t.simulateTouch && !c.touch && E.ios)) &&
                (n.addEventListener("mousedown", e.onTouchStart, !1),
                d.addEventListener("mousemove", e.onTouchMove, r),
                d.addEventListener("mouseup", e.onTouchEnd, !1));
            }
            (t.preventClicks || t.preventClicksPropagation) &&
              n.addEventListener("click", e.onClick, !0),
              e.on("resize observerUpdate", C);
          },
          detachEvents: function () {
            var e = this,
              t = e.params,
              i = e.touchEvents,
              a = e.el,
              s = e.wrapperEl,
              n = "container" === t.touchEventsTarget ? a : s,
              r = !!t.nested;
            if (m.ie)
              n.removeEventListener(i.start, e.onTouchStart, !1),
                (c.touch ? n : d).removeEventListener(i.move, e.onTouchMove, r),
                (c.touch ? n : d).removeEventListener(i.end, e.onTouchEnd, !1);
            else {
              if (c.touch) {
                var o = !(
                  "onTouchStart" !== i.start ||
                  !c.passiveListener ||
                  !t.passiveListeners
                ) && { passive: !0, capture: !1 };
                n.removeEventListener(i.start, e.onTouchStart, o),
                  n.removeEventListener(i.move, e.onTouchMove, r),
                  n.removeEventListener(i.end, e.onTouchEnd, o);
              }
              ((t.simulateTouch && !E.ios && !E.android) ||
                (t.simulateTouch && !c.touch && E.ios)) &&
                (n.removeEventListener("mousedown", e.onTouchStart, !1),
                d.removeEventListener("mousemove", e.onTouchMove, r),
                d.removeEventListener("mouseup", e.onTouchEnd, !1));
            }
            (t.preventClicks || t.preventClicksPropagation) &&
              n.removeEventListener("click", e.onClick, !0),
              e.off("resize observerUpdate", C);
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            var e = this,
              t = e.activeIndex,
              i = e.loopedSlides;
            void 0 === i && (i = 0);
            var a = e.params,
              s = a.breakpoints;
            if (s && (!s || 0 !== Object.keys(s).length)) {
              var n = e.getBreakpoint(s);
              if (n && e.currentBreakpoint !== n) {
                var r = n in s ? s[n] : e.originalParams,
                  o = a.loop && r.slidesPerView !== a.slidesPerView;
                l.extend(e.params, r),
                  l.extend(e, {
                    allowTouchMove: e.params.allowTouchMove,
                    allowSlideNext: e.params.allowSlideNext,
                    allowSlidePrev: e.params.allowSlidePrev,
                  }),
                  (e.currentBreakpoint = n),
                  o &&
                    (e.loopDestroy(),
                    e.loopCreate(),
                    e.updateSlides(),
                    e.slideTo(t - i + e.loopedSlides, 0, !1)),
                  e.emit("breakpoint", r);
              }
            }
          },
          getBreakpoint: function (e) {
            if (e) {
              var t = !1,
                i = [];
              Object.keys(e).forEach(function (e) {
                i.push(e);
              }),
                i.sort(function (e, t) {
                  return parseInt(e, 10) - parseInt(t, 10);
                });
              for (var a = 0; a < i.length; a += 1) {
                var n = i[a];
                n >= s.innerWidth && !t && (t = n);
              }
              return t || "max";
            }
          },
        },
        classes: {
          addClasses: function () {
            var e = this,
              t = e.classNames,
              i = e.params,
              a = e.rtl,
              n = e.$el,
              r = [];
            r.push(i.direction),
              i.freeMode && r.push("free-mode"),
              c.flexbox || r.push("no-flexbox"),
              i.autoHeight && r.push("autoheight"),
              a && r.push("rtl"),
              i.slidesPerColumn > 1 && r.push("multirow"),
              E.android && r.push("android"),
              E.ios && r.push("ios"),
              (s.navigator.pointerEnabled || s.navigator.msPointerEnabled) &&
                r.push("wp8-" + i.direction),
              r.forEach(function (e) {
                t.push(i.containerModifierClass + e);
              }),
              n.addClass(t.join(" "));
          },
          removeClasses: function () {
            var e = this,
              t = e.$el,
              i = e.classNames;
            t.removeClass(i.join(" "));
          },
        },
        images: {
          loadImage: function (e, t, i, a, n, r) {
            function o() {
              r && r();
            }
            var l;
            e.complete && n
              ? o()
              : t
              ? (((l = new s.Image()).onload = o),
                (l.onerror = o),
                a && (l.sizes = a),
                i && (l.srcset = i),
                t && (l.src = t))
              : o();
          },
          preloadImages: function () {
            var e = this;
            e.imagesToLoad = e.$el.find("img");
            for (var t = 0; t < e.imagesToLoad.length; t += 1) {
              var i = e.imagesToLoad[t];
              e.loadImage(
                i,
                i.currentSrc || i.getAttribute("src"),
                i.srcset || i.getAttribute("srcset"),
                i.sizes || i.getAttribute("sizes"),
                !0,
                function () {
                  null != e &&
                    e &&
                    !e.destroyed &&
                    (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length &&
                      (e.params.updateOnImagesReady && e.update(),
                      e.emit("imagesReady")));
                }
              );
            }
          },
        },
      },
      L = {},
      z = (function (t) {
        function i() {
          for (var a = [], n = arguments.length; n--; ) a[n] = arguments[n];
          var r, o, d;
          1 === a.length && a[0].constructor && a[0].constructor === Object
            ? (o = a[0])
            : ((r = (d = a)[0]), (o = d[1]));
          o || (o = {}),
            (o = l.extend({}, o)),
            r && !o.el && (o.el = r),
            t.call(this, o),
            Object.keys(k).forEach(function (e) {
              Object.keys(k[e]).forEach(function (t) {
                i.prototype[t] || (i.prototype[t] = k[e][t]);
              });
            });
          var u = this;
          void 0 === u.modules && (u.modules = {}),
            Object.keys(u.modules).forEach(function (e) {
              var t = u.modules[e];
              if (t.params) {
                var i = Object.keys(t.params)[0],
                  a = t.params[i];
                if ("object" != typeof a) return;
                if (!(i in o) || !("enabled" in a)) return;
                !0 === o[i] && (o[i] = { enabled: !0 }),
                  "object" != typeof o[i] ||
                    "enabled" in o[i] ||
                    (o[i].enabled = !0),
                  o[i] || (o[i] = { enabled: !1 });
              }
            });
          var p = l.extend({}, M);
          u.useModulesParams(p),
            (u.params = l.extend({}, p, L, o)),
            (u.originalParams = l.extend({}, u.params)),
            (u.passedParams = l.extend({}, o));
          var h = e(u.params.el);
          if ((r = h[0])) {
            if (h.length > 1) {
              var f = [];
              return (
                h.each(function (e, t) {
                  var a = l.extend({}, o, { el: t });
                  f.push(new i(a));
                }),
                f
              );
            }
            (r.swiper = u), h.data("swiper", u);
            var v = h.children("." + u.params.wrapperClass);
            return (
              l.extend(u, {
                $el: h,
                el: r,
                $wrapperEl: v,
                wrapperEl: v[0],
                classNames: [],
                slides: e(),
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: function () {
                  return "horizontal" === u.params.direction;
                },
                isVertical: function () {
                  return "vertical" === u.params.direction;
                },
                rtl:
                  "horizontal" === u.params.direction &&
                  ("rtl" === r.dir.toLowerCase() ||
                    "rtl" === h.css("direction")),
                wrongRTL: "-webkit-box" === v.css("display"),
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                allowSlideNext: u.params.allowSlideNext,
                allowSlidePrev: u.params.allowSlidePrev,
                touchEvents: (function () {
                  var e = ["touchstart", "touchmove", "touchend"],
                    t = ["mousedown", "mousemove", "mouseup"];
                  return (
                    s.navigator.pointerEnabled
                      ? (t = ["pointerdown", "pointermove", "pointerup"])
                      : s.navigator.msPointerEnabled &&
                        (t = ["MSPointerDown", "MsPointerMove", "MsPointerUp"]),
                    {
                      start: c.touch || !u.params.simulateTouch ? e[0] : t[0],
                      move: c.touch || !u.params.simulateTouch ? e[1] : t[1],
                      end: c.touch || !u.params.simulateTouch ? e[2] : t[2],
                    }
                  );
                })(),
                touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  formElements:
                    "input, select, option, textarea, button, video",
                  lastClickTime: l.now(),
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  isTouchEvent: void 0,
                  startMoving: void 0,
                },
                allowClick: !0,
                allowTouchMove: u.params.allowTouchMove,
                touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0,
                },
                imagesToLoad: [],
                imagesLoaded: 0,
              }),
              u.useModules(),
              u.params.init && u.init(),
              u
            );
          }
        }
        t && (i.__proto__ = t),
          (i.prototype = Object.create(t && t.prototype)),
          (i.prototype.constructor = i);
        var a = { extendedDefaults: {}, defaults: {}, Class: {}, $: {} };
        return (
          (i.prototype.slidesPerViewDynamic = function () {
            var e = this,
              t = e.params,
              i = e.slides,
              a = e.slidesGrid,
              s = e.size,
              n = e.activeIndex,
              r = 1;
            if (t.centeredSlides) {
              for (
                var o, l = i[n].swiperSlideSize, d = n + 1;
                d < i.length;
                d += 1
              )
                i[d] &&
                  !o &&
                  ((r += 1), (l += i[d].swiperSlideSize) > s && (o = !0));
              for (var c = n - 1; c >= 0; c -= 1)
                i[c] &&
                  !o &&
                  ((r += 1), (l += i[c].swiperSlideSize) > s && (o = !0));
            } else
              for (var u = n + 1; u < i.length; u += 1)
                a[u] - a[n] < s && (r += 1);
            return r;
          }),
          (i.prototype.update = function () {
            function e() {
              (i = Math.min(
                Math.max(t.translate, t.maxTranslate()),
                t.minTranslate()
              )),
                t.setTranslate(i),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            }
            var t = this,
              i;
            t &&
              !t.destroyed &&
              (t.updateSize(),
              t.updateSlides(),
              t.updateProgress(),
              t.updateSlidesClasses(),
              t.params.freeMode
                ? (e(), t.params.autoHeight && t.updateAutoHeight())
                : (("auto" === t.params.slidesPerView ||
                    t.params.slidesPerView > 1) &&
                  t.isEnd &&
                  !t.params.centeredSlides
                    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
                    : t.slideTo(t.activeIndex, 0, !1, !0)) || e(),
              t.emit("update"));
          }),
          (i.prototype.init = function () {
            var e = this;
            e.initialized ||
              (e.emit("beforeInit"),
              e.params.breakpoints && e.setBreakpoint(),
              e.addClasses(),
              e.params.loop && e.loopCreate(),
              e.updateSize(),
              e.updateSlides(),
              e.params.grabCursor && e.setGrabCursor(),
              e.params.preloadImages && e.preloadImages(),
              e.params.loop
                ? e.slideTo(
                    e.params.initialSlide + e.loopedSlides,
                    0,
                    e.params.runCallbacksOnInit
                  )
                : e.slideTo(
                    e.params.initialSlide,
                    0,
                    e.params.runCallbacksOnInit
                  ),
              e.attachEvents(),
              (e.initialized = !0),
              e.emit("init"));
          }),
          (i.prototype.destroy = function (e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            var i = this,
              a = i.params,
              s = i.$el,
              n = i.$wrapperEl,
              r = i.slides;
            i.emit("beforeDestroy"),
              (i.initialized = !1),
              i.detachEvents(),
              a.loop && i.loopDestroy(),
              t &&
                (i.removeClasses(),
                s.removeAttr("style"),
                n.removeAttr("style"),
                r &&
                  r.length &&
                  r
                    .removeClass(
                      [
                        a.slideVisibleClass,
                        a.slideActiveClass,
                        a.slideNextClass,
                        a.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")
                    .removeAttr("data-swiper-column")
                    .removeAttr("data-swiper-row")),
              i.emit("destroy"),
              Object.keys(i.eventsListeners).forEach(function (e) {
                i.off(e);
              }),
              !1 !== e &&
                ((i.$el[0].swiper = null),
                i.$el.data("swiper", null),
                l.deleteProps(i)),
              (i.destroyed = !0);
          }),
          (i.extendDefaults = function (e) {
            l.extend(L, e);
          }),
          (a.extendedDefaults.get = function () {
            return L;
          }),
          (a.defaults.get = function () {
            return M;
          }),
          (a.Class.get = function () {
            return t;
          }),
          (a.$.get = function () {
            return e;
          }),
          Object.defineProperties(i, a),
          i
        );
      })(u),
      P = { name: "device", proto: { device: E }, static: { device: E } },
      I = { name: "support", proto: { support: c }, static: { support: c } },
      A = { name: "browser", proto: { browser: m }, static: { browser: m } },
      D = {
        name: "resize",
        create: function () {
          var e = this;
          l.extend(e, {
            resize: {
              resizeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (e.emit("beforeResize"), e.emit("resize"));
              },
              orientationChangeHandler: function () {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  e.emit("orientationchange");
              },
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            s.addEventListener("resize", e.resize.resizeHandler),
              s.addEventListener(
                "orientationchange",
                e.resize.orientationChangeHandler
              );
          },
          destroy: function () {
            var e = this;
            s.removeEventListener("resize", e.resize.resizeHandler),
              s.removeEventListener(
                "orientationchange",
                e.resize.orientationChangeHandler
              );
          },
        },
      },
      O = {
        func: s.MutationObserver || s.WebkitMutationObserver,
        attach: function (e, t) {
          void 0 === t && (t = {});
          var i = this,
            a = new (0, O.func)(function (e) {
              e.forEach(function (e) {
                i.emit("observerUpdate", e);
              });
            });
          a.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            i.observer.observers.push(a);
        },
        init: function () {
          var e = this;
          if (c.observer && e.params.observer) {
            if (e.params.observeParents)
              for (var t = e.$el.parents(), i = 0; i < t.length; i += 1)
                e.observer.attach(t[i]);
            e.observer.attach(e.$el[0], { childList: !1 }),
              e.observer.attach(e.$wrapperEl[0], { attributes: !1 });
          }
        },
        destroy: function () {
          var e = this;
          e.observer.observers.forEach(function (e) {
            e.disconnect();
          }),
            (e.observer.observers = []);
        },
      },
      j = {
        name: "observer",
        params: { observer: !1, observeParents: !1 },
        create: function () {
          var e = this;
          l.extend(e, {
            observer: {
              init: O.init.bind(e),
              attach: O.attach.bind(e),
              destroy: O.destroy.bind(e),
              observers: [],
            },
          });
        },
        on: {
          init: function () {
            this.observer.init();
          },
          destroy: function () {
            this.observer.destroy();
          },
        },
      },
      H = {
        update: function (e) {
          function t() {
            i.updateSlides(),
              i.updateProgress(),
              i.updateSlidesClasses(),
              i.lazy && i.params.lazy.enabled && i.lazy.load();
          }
          var i = this,
            a = i.params,
            s = a.slidesPerView,
            n = a.slidesPerGroup,
            r = a.centeredSlides,
            o = i.virtual,
            d = o.from,
            c = o.to,
            u = o.slides,
            p = o.slidesGrid,
            h = o.renderSlide,
            f = o.offset;
          i.updateActiveIndex();
          var v,
            m = i.activeIndex || 0,
            g,
            b;
          (v =
            i.rtl && i.isHorizontal()
              ? "right"
              : i.isHorizontal()
              ? "left"
              : "top"),
            r
              ? ((g = Math.floor(s / 2) + n), (b = Math.floor(s / 2) + n))
              : ((g = s + (n - 1)), (b = n));
          var w = Math.max((m || 0) - b, 0),
            y = Math.min((m || 0) + g, u.length - 1),
            E = (i.slidesGrid[w] || 0) - (i.slidesGrid[0] || 0);
          if (
            (l.extend(i.virtual, {
              from: w,
              to: y,
              offset: E,
              slidesGrid: i.slidesGrid,
            }),
            d === w && c === y && !e)
          )
            return (
              i.slidesGrid !== p && E !== f && i.slides.css(v, E + "px"),
              void i.updateProgress()
            );
          if (i.params.virtual.renderExternal)
            return (
              i.params.virtual.renderExternal.call(i, {
                offset: E,
                from: w,
                to: y,
                slides: (function () {
                  for (var e = [], t = w; t <= y; t += 1) e.push(u[t]);
                  return e;
                })(),
              }),
              void t()
            );
          var x = [],
            S = [];
          if (e) i.$wrapperEl.find("." + i.params.slideClass).remove();
          else
            for (var T = d; T <= c; T += 1)
              (T < w || T > y) &&
                i.$wrapperEl
                  .find(
                    "." +
                      i.params.slideClass +
                      '[data-swiper-slide-index="' +
                      T +
                      '"]'
                  )
                  .remove();
          for (var C = 0; C < u.length; C += 1)
            C >= w &&
              C <= y &&
              (void 0 === c || e
                ? S.push(C)
                : (C > c && S.push(C), C < d && x.push(C)));
          S.forEach(function (e) {
            i.$wrapperEl.append(h(u[e], e));
          }),
            x
              .sort(function (e, t) {
                return e < t;
              })
              .forEach(function (e) {
                i.$wrapperEl.prepend(h(u[e], e));
              }),
            i.$wrapperEl.children(".swiper-slide").css(v, E + "px"),
            t();
        },
        renderSlide: function (t, i) {
          var a = this,
            s = a.params.virtual;
          if (s.cache && a.virtual.cache[i]) return a.virtual.cache[i];
          var n = e(
            s.renderSlide
              ? s.renderSlide.call(a, t, i)
              : '<div class="' +
                  a.params.slideClass +
                  '" data-swiper-slide-index="' +
                  i +
                  '">' +
                  t +
                  "</div>"
          );
          return (
            n.attr("data-swiper-slide-index") ||
              n.attr("data-swiper-slide-index", i),
            s.cache && (a.virtual.cache[i] = n),
            n
          );
        },
        appendSlide: function (e) {
          var t = this;
          t.virtual.slides.push(e), t.virtual.update(!0);
        },
        prependSlide: function (e) {
          var t = this;
          if ((t.virtual.slides.unshift(e), t.params.virtual.cache)) {
            var i = t.virtual.cache,
              a = {};
            Object.keys(i).forEach(function (e) {
              a[e + 1] = i[e];
            }),
              (t.virtual.cache = a);
          }
          t.virtual.update(!0), t.slideNext(0);
        },
      },
      B = {
        name: "virtual",
        params: {
          virtual: {
            enabled: !1,
            slides: [],
            cache: !0,
            renderSlide: null,
            renderExternal: null,
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            virtual: {
              update: H.update.bind(e),
              appendSlide: H.appendSlide.bind(e),
              prependSlide: H.prependSlide.bind(e),
              renderSlide: H.renderSlide.bind(e),
              slides: e.params.virtual.slides,
              cache: {},
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if (e.params.virtual.enabled) {
              e.classNames.push(e.params.containerModifierClass + "virtual");
              var t = { watchSlidesProgress: !0 };
              l.extend(e.params, t),
                l.extend(e.originalParams, t),
                e.virtual.update();
            }
          },
          setTranslate: function () {
            var e = this;
            e.params.virtual.enabled && e.virtual.update();
          },
        },
      },
      N = {
        handle: function (e) {
          var t = this,
            i = e;
          i.originalEvent && (i = i.originalEvent);
          var a = i.keyCode || i.charCode;
          if (
            !t.allowSlideNext &&
            ((t.isHorizontal() && 39 === a) || (t.isVertical() && 40 === a))
          )
            return !1;
          if (
            !t.allowSlidePrev &&
            ((t.isHorizontal() && 37 === a) || (t.isVertical() && 38 === a))
          )
            return !1;
          if (
            !(
              i.shiftKey ||
              i.altKey ||
              i.ctrlKey ||
              i.metaKey ||
              (d.activeElement &&
                d.activeElement.nodeName &&
                ("input" === d.activeElement.nodeName.toLowerCase() ||
                  "textarea" === d.activeElement.nodeName.toLowerCase()))
            )
          ) {
            if (37 === a || 39 === a || 38 === a || 40 === a) {
              var n = !1;
              if (
                t.$el.parents("." + t.params.slideClass).length > 0 &&
                0 === t.$el.parents("." + t.params.slideActiveClass).length
              )
                return;
              var r = { left: s.pageXOffset, top: s.pageYOffset },
                o = s.innerWidth,
                l = s.innerHeight,
                c = t.$el.offset();
              t.rtl && (c.left -= t.$el[0].scrollLeft);
              for (
                var u = [
                    [c.left, c.top],
                    [c.left + t.width, c.top],
                    [c.left, c.top + t.height],
                    [c.left + t.width, c.top + t.height],
                  ],
                  p = 0;
                p < u.length;
                p += 1
              ) {
                var h = u[p];
                h[0] >= r.left &&
                  h[0] <= r.left + o &&
                  h[1] >= r.top &&
                  h[1] <= r.top + l &&
                  (n = !0);
              }
              if (!n) return;
            }
            t.isHorizontal()
              ? ((37 !== a && 39 !== a) ||
                  (i.preventDefault
                    ? i.preventDefault()
                    : (i.returnValue = !1)),
                ((39 === a && !t.rtl) || (37 === a && t.rtl)) && t.slideNext(),
                ((37 === a && !t.rtl) || (39 === a && t.rtl)) && t.slidePrev())
              : ((38 !== a && 40 !== a) ||
                  (i.preventDefault
                    ? i.preventDefault()
                    : (i.returnValue = !1)),
                40 === a && t.slideNext(),
                38 === a && t.slidePrev()),
              t.emit("keyPress", a);
          }
        },
        enable: function () {
          var t = this;
          t.keyboard.enabled ||
            (e(d).on("keydown", t.keyboard.handle), (t.keyboard.enabled = !0));
        },
        disable: function () {
          var t = this;
          t.keyboard.enabled &&
            (e(d).off("keydown", t.keyboard.handle), (t.keyboard.enabled = !1));
        },
      },
      q = {
        name: "keyboard",
        params: { keyboard: { enabled: !1 } },
        create: function () {
          var e = this;
          l.extend(e, {
            keyboard: {
              enabled: !1,
              enable: N.enable.bind(e),
              disable: N.disable.bind(e),
              handle: N.handle.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.params.keyboard.enabled && e.keyboard.enable();
          },
          destroy: function () {
            var e = this;
            e.keyboard.enabled && e.keyboard.disable();
          },
        },
      },
      X = {
        lastScrollTime: l.now(),
        event:
          s.navigator.userAgent.indexOf("firefox") > -1
            ? "DOMMouseScroll"
            : i()
            ? "wheel"
            : "mousewheel",
        normalize: function (e) {
          var t = 0,
            i = 0,
            a = 0,
            s = 0;
          return (
            "detail" in e && (i = e.detail),
            "wheelDelta" in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
            "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
            (a = 10 * t),
            (s = 10 * i),
            "deltaY" in e && (s = e.deltaY),
            "deltaX" in e && (a = e.deltaX),
            (a || s) &&
              e.deltaMode &&
              (1 === e.deltaMode
                ? ((a *= 40), (s *= 40))
                : ((a *= 800), (s *= 800))),
            a && !t && (t = a < 1 ? -1 : 1),
            s && !i && (i = s < 1 ? -1 : 1),
            { spinX: t, spinY: i, pixelX: a, pixelY: s }
          );
        },
        handle: function (e) {
          var t = e,
            i = this,
            a = i.params.mousewheel;
          t.originalEvent && (t = t.originalEvent);
          var n = 0,
            r = i.rtl ? -1 : 1,
            o = X.normalize(t);
          if (a.forceToAxis)
            if (i.isHorizontal()) {
              if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
              n = o.pixelX * r;
            } else {
              if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
              n = o.pixelY;
            }
          else
            n =
              Math.abs(o.pixelX) > Math.abs(o.pixelY)
                ? -o.pixelX * r
                : -o.pixelY;
          if (0 === n) return !0;
          if ((a.invert && (n = -n), i.params.freeMode)) {
            var d = i.getTranslate() + n * a.sensitivity,
              c = i.isBeginning,
              u = i.isEnd;
            if (
              (d >= i.minTranslate() && (d = i.minTranslate()),
              d <= i.maxTranslate() && (d = i.maxTranslate()),
              i.setTransition(0),
              i.setTranslate(d),
              i.updateProgress(),
              i.updateActiveIndex(),
              i.updateSlidesClasses(),
              ((!c && i.isBeginning) || (!u && i.isEnd)) &&
                i.updateSlidesClasses(),
              i.params.freeModeSticky &&
                (clearTimeout(i.mousewheel.timeout),
                (i.mousewheel.timeout = l.nextTick(function () {
                  i.slideReset();
                }, 300))),
              i.emit("scroll", t),
              i.params.autoplay &&
                i.params.autoplayDisableOnInteraction &&
                i.stopAutoplay(),
              0 === d || d === i.maxTranslate())
            )
              return !0;
          } else {
            if (l.now() - i.mousewheel.lastScrollTime > 60)
              if (n < 0)
                if ((i.isEnd && !i.params.loop) || i.animating) {
                  if (a.releaseOnEdges) return !0;
                } else i.slideNext(), i.emit("scroll", t);
              else if ((i.isBeginning && !i.params.loop) || i.animating) {
                if (a.releaseOnEdges) return !0;
              } else i.slidePrev(), i.emit("scroll", t);
            i.mousewheel.lastScrollTime = new s.Date().getTime();
          }
          return (
            t.preventDefault ? t.preventDefault() : (t.returnValue = !1), !1
          );
        },
        enable: function () {
          var t = this;
          if (!X.event) return !1;
          if (t.mousewheel.enabled) return !1;
          var i = t.$el;
          return (
            "container" !== t.params.mousewheel.eventsTarged &&
              (i = e(t.params.mousewheel.eventsTarged)),
            i.on(X.event, t.mousewheel.handle),
            (t.mousewheel.enabled = !0),
            !0
          );
        },
        disable: function () {
          var t = this;
          if (!X.event) return !1;
          if (!t.mousewheel.enabled) return !1;
          var i = t.$el;
          return (
            "container" !== t.params.mousewheel.eventsTarged &&
              (i = e(t.params.mousewheel.eventsTarged)),
            i.off(X.event, t.mousewheel.handle),
            (t.mousewheel.enabled = !1),
            !0
          );
        },
      },
      G = {
        name: "mousewheel",
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: "container",
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            mousewheel: {
              enabled: !1,
              enable: X.enable.bind(e),
              disable: X.disable.bind(e),
              handle: X.handle.bind(e),
              lastScrollTime: l.now(),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.params.mousewheel.enabled && e.mousewheel.enable();
          },
          destroy: function () {
            var e = this;
            e.mousewheel.enabled && e.mousewheel.disable();
          },
        },
      },
      Y = {
        update: function () {
          var e = this,
            t = e.params.navigation;
          if (!e.params.loop) {
            var i = e.navigation,
              a = i.$nextEl,
              s = i.$prevEl;
            s &&
              s.length > 0 &&
              (e.isBeginning
                ? s.addClass(t.disabledClass)
                : s.removeClass(t.disabledClass)),
              a &&
                a.length > 0 &&
                (e.isEnd
                  ? a.addClass(t.disabledClass)
                  : a.removeClass(t.disabledClass));
          }
        },
        init: function () {
          var t = this,
            i = t.params.navigation,
            a,
            s;
          (i.nextEl || i.prevEl) &&
            (i.nextEl &&
              ((a = e(i.nextEl)),
              t.params.uniqueNavElements &&
                "string" == typeof i.nextEl &&
                a.length > 1 &&
                1 === t.$el.find(i.nextEl).length &&
                (a = t.$el.find(i.nextEl))),
            i.prevEl &&
              ((s = e(i.prevEl)),
              t.params.uniqueNavElements &&
                "string" == typeof i.prevEl &&
                s.length > 1 &&
                1 === t.$el.find(i.prevEl).length &&
                (s = t.$el.find(i.prevEl))),
            a &&
              a.length > 0 &&
              a.on("click", function (e) {
                e.preventDefault(),
                  (t.isEnd && !t.params.loop) || t.slideNext();
              }),
            s &&
              s.length > 0 &&
              s.on("click", function (e) {
                e.preventDefault(),
                  (t.isBeginning && !t.params.loop) || t.slidePrev();
              }),
            l.extend(t.navigation, {
              $nextEl: a,
              nextEl: a && a[0],
              $prevEl: s,
              prevEl: s && s[0],
            }));
        },
        destroy: function () {
          var e = this,
            t = e.navigation,
            i = t.$nextEl,
            a = t.$prevEl;
          i &&
            i.length &&
            (i.off("click"), i.removeClass(e.params.navigation.disabledClass)),
            a &&
              a.length &&
              (a.off("click"),
              a.removeClass(e.params.navigation.disabledClass));
        },
      },
      R = {
        name: "navigation",
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            navigation: {
              init: Y.init.bind(e),
              update: Y.update.bind(e),
              destroy: Y.destroy.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.navigation.init(), e.navigation.update();
          },
          toEdge: function () {
            this.navigation.update();
          },
          fromEdge: function () {
            this.navigation.update();
          },
          destroy: function () {
            this.navigation.destroy();
          },
          click: function (t) {
            var i = this,
              a = i.navigation,
              s = a.$nextEl,
              n = a.$prevEl;
            !i.params.navigation.hideOnClick ||
              e(t.target).is(n) ||
              e(t.target).is(s) ||
              (s && s.toggleClass(i.params.navigation.hiddenClass),
              n && n.toggleClass(i.params.navigation.hiddenClass));
          },
        },
      },
      F = {
        update: function () {
          var t = this,
            i = t.rtl,
            a = t.params.pagination;
          if (
            a.el &&
            t.pagination.el &&
            t.pagination.$el &&
            0 !== t.pagination.$el.length
          ) {
            var s,
              n =
                t.virtual && t.params.virtual.enabled
                  ? t.virtual.slides.length
                  : t.slides.length,
              r = t.pagination.$el,
              o = t.params.loop
                ? Math.ceil((n - 2 * t.loopedSlides) / t.params.slidesPerGroup)
                : t.snapGrid.length;
            if (
              (t.params.loop
                ? ((s = Math.ceil(
                    (t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup
                  )) >
                    n - 1 - 2 * t.loopedSlides && (s -= n - 2 * t.loopedSlides),
                  s > o - 1 && (s -= o),
                  s < 0 && "bullets" !== t.params.paginationType && (s = o + s))
                : (s =
                    void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0),
              "bullets" === a.type &&
                t.pagination.bullets &&
                t.pagination.bullets.length > 0)
            ) {
              var l = t.pagination.bullets;
              if (
                (a.dynamicBullets &&
                  ((t.pagination.bulletSize = l
                    .eq(0)
                    [t.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                  r.css(
                    t.isHorizontal() ? "width" : "height",
                    5 * t.pagination.bulletSize + "px"
                  )),
                l.removeClass(
                  a.bulletActiveClass +
                    " " +
                    a.bulletActiveClass +
                    "-next " +
                    a.bulletActiveClass +
                    "-next-next " +
                    a.bulletActiveClass +
                    "-prev " +
                    a.bulletActiveClass +
                    "-prev-prev"
                ),
                r.length > 1)
              )
                l.each(function (t, i) {
                  var n = e(i);
                  n.index() === s &&
                    (n.addClass(a.bulletActiveClass),
                    a.dynamicBullets &&
                      (n
                        .prev()
                        .addClass(a.bulletActiveClass + "-prev")
                        .prev()
                        .addClass(a.bulletActiveClass + "-prev-prev"),
                      n
                        .next()
                        .addClass(a.bulletActiveClass + "-next")
                        .next()
                        .addClass(a.bulletActiveClass + "-next-next")));
                });
              else {
                var d = l.eq(s);
                d.addClass(a.bulletActiveClass),
                  a.dynamicBullets &&
                    (d
                      .prev()
                      .addClass(a.bulletActiveClass + "-prev")
                      .prev()
                      .addClass(a.bulletActiveClass + "-prev-prev"),
                    d
                      .next()
                      .addClass(a.bulletActiveClass + "-next")
                      .next()
                      .addClass(a.bulletActiveClass + "-next-next"));
              }
              if (a.dynamicBullets) {
                var c = Math.min(l.length, 5),
                  u =
                    (t.pagination.bulletSize * c - t.pagination.bulletSize) /
                      2 -
                    s * t.pagination.bulletSize,
                  p = i ? "right" : "left";
                l.css(t.isHorizontal() ? p : "top", u + "px");
              }
            }
            if (
              ("fraction" === a.type &&
                (r.find("." + a.currentClass).text(s + 1),
                r.find("." + a.totalClass).text(o)),
              "progressbar" === a.type)
            ) {
              var h = (s + 1) / o,
                f = h,
                v = 1;
              t.isHorizontal() || ((v = h), (f = 1)),
                r
                  .find("." + a.progressbarFillClass)
                  .transform(
                    "translate3d(0,0,0) scaleX(" + f + ") scaleY(" + v + ")"
                  )
                  .transition(t.params.speed);
            }
            "custom" === a.type && a.renderCustom
              ? (r.html(a.renderCustom(t, s + 1, o)),
                t.emit("paginationRender", t, r[0]))
              : t.emit("paginationUpdate", t, r[0]);
          }
        },
        render: function () {
          var e = this,
            t = e.params.pagination;
          if (
            t.el &&
            e.pagination.el &&
            e.pagination.$el &&
            0 !== e.pagination.$el.length
          ) {
            var i =
                e.virtual && e.params.virtual.enabled
                  ? e.virtual.slides.length
                  : e.slides.length,
              a = e.pagination.$el,
              s = "";
            if ("bullets" === t.type) {
              for (
                var n = e.params.loop
                    ? Math.ceil(
                        (i - 2 * e.loopedSlides) / e.params.slidesPerGroup
                      )
                    : e.snapGrid.length,
                  r = 0;
                r < n;
                r += 1
              )
                t.renderBullet
                  ? (s += t.renderBullet.call(e, r, t.bulletClass))
                  : (s +=
                      "<" +
                      t.bulletElement +
                      ' class="' +
                      t.bulletClass +
                      '"></' +
                      t.bulletElement +
                      ">");
              a.html(s), (e.pagination.bullets = a.find("." + t.bulletClass));
            }
            "fraction" === t.type &&
              ((s = t.renderFraction
                ? t.renderFraction.call(e, t.currentClass, t.totalClass)
                : '<span class="' +
                  t.currentClass +
                  '"></span> / <span class="' +
                  t.totalClass +
                  '"></span>'),
              a.html(s)),
              "progressbar" === t.type &&
                ((s = t.renderProgressbar
                  ? t.renderProgressbar.call(e, t.progressbarFillClass)
                  : '<span class="' + t.progressbarFillClass + '"></span>'),
                a.html(s)),
              "custom" !== t.type &&
                e.emit("paginationRender", e.pagination.$el[0]);
          }
        },
        init: function () {
          var t = this,
            i = t.params.pagination;
          if (i.el) {
            var a = e(i.el);
            0 !== a.length &&
              (t.params.uniqueNavElements &&
                "string" == typeof i.el &&
                a.length > 1 &&
                1 === t.$el.find(i.el).length &&
                (a = t.$el.find(i.el)),
              "bullets" === i.type &&
                i.clickable &&
                a.addClass(i.clickableClass),
              a.addClass(i.modifierClass + i.type),
              "bullets" === i.type &&
                i.dynamicBullets &&
                a.addClass("" + i.modifierClass + i.type + "-dynamic"),
              i.clickable &&
                a.on("click", "." + i.bulletClass, function (i) {
                  i.preventDefault();
                  var a = e(this).index() * t.params.slidesPerGroup;
                  t.params.loop && (a += t.loopedSlides), t.slideTo(a);
                }),
              l.extend(t.pagination, { $el: a, el: a[0] }));
          }
        },
        destroy: function () {
          var e = this,
            t = e.params.pagination;
          if (
            t.el &&
            e.pagination.el &&
            e.pagination.$el &&
            0 !== e.pagination.$el.length
          ) {
            var i = e.pagination.$el;
            i.removeClass(t.hiddenClass),
              i.removeClass(t.modifierClass + t.type),
              e.pagination.bullets &&
                e.pagination.bullets.removeClass(t.bulletActiveClass),
              t.clickable && i.off("click", "." + t.bulletClass);
          }
        },
      },
      _ = {
        name: "pagination",
        params: {
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            type: "bullets",
            dynamicBullets: !1,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            modifierClass: "swiper-pagination-",
            currentClass: "swiper-pagination-current",
            totalClass: "swiper-pagination-total",
            hiddenClass: "swiper-pagination-hidden",
            progressbarFillClass: "swiper-pagination-progressbar-fill",
            clickableClass: "swiper-pagination-clickable",
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            pagination: {
              init: F.init.bind(e),
              render: F.render.bind(e),
              update: F.update.bind(e),
              destroy: F.destroy.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.pagination.init(), e.pagination.render(), e.pagination.update();
          },
          activeIndexChange: function () {
            var e = this;
            (e.params.loop || void 0 === e.snapIndex) && e.pagination.update();
          },
          snapIndexChange: function () {
            var e = this;
            e.params.loop || e.pagination.update();
          },
          slidesLengthChange: function () {
            var e = this;
            e.params.loop && (e.pagination.render(), e.pagination.update());
          },
          snapGridLengthChange: function () {
            var e = this;
            e.params.loop || (e.pagination.render(), e.pagination.update());
          },
          destroy: function () {
            this.pagination.destroy();
          },
          click: function (t) {
            var i = this;
            i.params.pagination.el &&
              i.params.pagination.hideOnClick &&
              i.pagination.$el.length > 0 &&
              !e(t.target).hasClass(i.params.pagination.bulletClass) &&
              i.pagination.$el.toggleClass(i.params.pagination.hiddenClass);
          },
        },
      },
      V = {
        setTranslate: function () {
          var e = this;
          if (e.params.scrollbar.el && e.scrollbar.el) {
            var t = e.scrollbar,
              i = e.rtl,
              a = e.progress,
              s = t.dragSize,
              n = t.trackSize,
              r = t.$dragEl,
              o = t.$el,
              l = e.params.scrollbar,
              d = s,
              u = (n - s) * a;
            i && e.isHorizontal()
              ? (u = -u) > 0
                ? ((d = s - u), (u = 0))
                : -u + s > n && (d = n + u)
              : u < 0
              ? ((d = s + u), (u = 0))
              : u + s > n && (d = n - u),
              e.isHorizontal()
                ? (c.transforms3d
                    ? r.transform("translate3d(" + u + "px, 0, 0)")
                    : r.transform("translateX(" + u + "px)"),
                  (r[0].style.width = d + "px"))
                : (c.transforms3d
                    ? r.transform("translate3d(0px, " + u + "px, 0)")
                    : r.transform("translateY(" + u + "px)"),
                  (r[0].style.height = d + "px")),
              l.hide &&
                (clearTimeout(e.scrollbar.timeout),
                (o[0].style.opacity = 1),
                (e.scrollbar.timeout = setTimeout(function () {
                  (o[0].style.opacity = 0), o.transition(400);
                }, 1e3)));
          }
        },
        setTransition: function (e) {
          var t = this;
          t.params.scrollbar.el &&
            t.scrollbar.el &&
            t.scrollbar.$dragEl.transition(e);
        },
        updateSize: function () {
          var e = this;
          if (e.params.scrollbar.el && e.scrollbar.el) {
            var t = e.scrollbar,
              i = t.$dragEl,
              a = t.$el;
            (i[0].style.width = ""), (i[0].style.height = "");
            var s,
              n = e.isHorizontal() ? a[0].offsetWidth : a[0].offsetHeight,
              r = e.size / e.virtualSize,
              o = r * (n / e.size);
            (s =
              "auto" === e.params.scrollbar.dragSize
                ? n * r
                : parseInt(e.params.scrollbar.dragSize, 10)),
              e.isHorizontal()
                ? (i[0].style.width = s + "px")
                : (i[0].style.height = s + "px"),
              (a[0].style.display = r >= 1 ? "none" : ""),
              e.params.scrollbarHide && (a[0].style.opacity = 0),
              l.extend(t, {
                trackSize: n,
                divider: r,
                moveDivider: o,
                dragSize: s,
              });
          }
        },
        setDragPosition: function (e) {
          var t,
            i = this,
            a = i.scrollbar,
            s = a.$el,
            n = a.dragSize,
            r = a.trackSize;
          (t =
            ((i.isHorizontal()
              ? "touchstart" === e.type || "touchmove" === e.type
                ? e.targetTouches[0].pageX
                : e.pageX || e.clientX
              : "touchstart" === e.type || "touchmove" === e.type
              ? e.targetTouches[0].pageY
              : e.pageY || e.clientY) -
              s.offset()[i.isHorizontal() ? "left" : "top"] -
              n / 2) /
            (r - n)),
            (t = Math.max(Math.min(t, 1), 0)),
            i.rtl && (t = 1 - t);
          var o = i.minTranslate() + (i.maxTranslate() - i.minTranslate()) * t;
          i.updateProgress(o),
            i.setTranslate(o),
            i.updateActiveIndex(),
            i.updateSlidesClasses();
        },
        onDragStart: function (e) {
          var t = this,
            i = t.params.scrollbar,
            a = t.scrollbar,
            s = t.$wrapperEl,
            n = a.$el,
            r = a.$dragEl;
          (t.scrollbar.isTouched = !0),
            e.preventDefault(),
            e.stopPropagation(),
            s.transition(100),
            r.transition(100),
            a.setDragPosition(e),
            clearTimeout(t.scrollbar.dragTimeout),
            n.transition(0),
            i.hide && n.css("opacity", 1),
            t.emit("scrollbarDragStart", e);
        },
        onDragMove: function (e) {
          var t = this,
            i = t.scrollbar,
            a = t.$wrapperEl,
            s = i.$el,
            n = i.$dragEl;
          t.scrollbar.isTouched &&
            (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
            i.setDragPosition(e),
            a.transition(0),
            s.transition(0),
            n.transition(0),
            t.emit("scrollbarDragMove", e));
        },
        onDragEnd: function (e) {
          var t = this,
            i = t.params.scrollbar,
            a = t.scrollbar.$el;
          t.scrollbar.isTouched &&
            ((t.scrollbar.isTouched = !1),
            i.hide &&
              (clearTimeout(t.scrollbar.dragTimeout),
              (t.scrollbar.dragTimeout = l.nextTick(function () {
                a.css("opacity", 0), a.transition(400);
              }, 1e3))),
            t.emit("scrollbarDragEnd", e),
            i.snapOnRelease && t.slideReset());
        },
        enableDraggable: function () {
          var t = this;
          if (t.params.scrollbar.el) {
            var i = t.scrollbar.$el,
              a = c.touch ? i[0] : document;
            i.on(t.scrollbar.dragEvents.start, t.scrollbar.onDragStart),
              e(a).on(t.scrollbar.dragEvents.move, t.scrollbar.onDragMove),
              e(a).on(t.scrollbar.dragEvents.end, t.scrollbar.onDragEnd);
          }
        },
        disableDraggable: function () {
          var t = this;
          if (t.params.scrollbar.el) {
            var i = t.scrollbar.$el,
              a = c.touch ? i[0] : document;
            i.off(t.scrollbar.dragEvents.start),
              e(a).off(t.scrollbar.dragEvents.move),
              e(a).off(t.scrollbar.dragEvents.end);
          }
        },
        init: function () {
          var t = this;
          if (t.params.scrollbar.el) {
            var i = t.scrollbar,
              a = t.$el,
              s = t.touchEvents,
              n = t.params.scrollbar,
              r = e(n.el);
            t.params.uniqueNavElements &&
              "string" == typeof n.el &&
              r.length > 1 &&
              1 === a.find(n.el).length &&
              (r = a.find(n.el));
            var o = r.find(".swiper-scrollbar-drag");
            0 === o.length &&
              ((o = e('<div class="swiper-scrollbar-drag"></div>')),
              r.append(o)),
              (t.scrollbar.dragEvents =
                !1 !== t.params.simulateTouch || c.touch
                  ? s
                  : { start: "mousedown", move: "mousemove", end: "mouseup" }),
              l.extend(i, { $el: r, el: r[0], $dragEl: o, dragEl: o[0] }),
              n.draggable && i.enableDraggable();
          }
        },
        destroy: function () {
          this.scrollbar.disableDraggable();
        },
      },
      W = {
        name: "scrollbar",
        params: {
          scrollbar: {
            el: null,
            dragSize: "auto",
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            scrollbar: {
              init: V.init.bind(e),
              destroy: V.destroy.bind(e),
              updateSize: V.updateSize.bind(e),
              setTranslate: V.setTranslate.bind(e),
              setTransition: V.setTransition.bind(e),
              enableDraggable: V.enableDraggable.bind(e),
              disableDraggable: V.disableDraggable.bind(e),
              setDragPosition: V.setDragPosition.bind(e),
              onDragStart: V.onDragStart.bind(e),
              onDragMove: V.onDragMove.bind(e),
              onDragEnd: V.onDragEnd.bind(e),
              isTouched: !1,
              timeout: null,
              dragTimeout: null,
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.scrollbar.init(),
              e.scrollbar.updateSize(),
              e.scrollbar.setTranslate();
          },
          update: function () {
            this.scrollbar.updateSize();
          },
          resize: function () {
            this.scrollbar.updateSize();
          },
          observerUpdate: function () {
            this.scrollbar.updateSize();
          },
          setTranslate: function () {
            this.scrollbar.setTranslate();
          },
          setTransition: function (e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function () {
            this.scrollbar.destroy();
          },
        },
      },
      U = {
        setTransform: function (t, i) {
          var a = this,
            s = a.rtl,
            n = e(t),
            r = s ? -1 : 1,
            o = n.attr("data-swiper-parallax") || "0",
            l = n.attr("data-swiper-parallax-x"),
            d = n.attr("data-swiper-parallax-y"),
            c = n.attr("data-swiper-parallax-scale"),
            u = n.attr("data-swiper-parallax-opacity");
          if (
            (l || d
              ? ((l = l || "0"), (d = d || "0"))
              : a.isHorizontal()
              ? ((l = o), (d = "0"))
              : ((d = o), (l = "0")),
            (l =
              l.indexOf("%") >= 0
                ? parseInt(l, 10) * i * r + "%"
                : l * i * r + "px"),
            (d =
              d.indexOf("%") >= 0 ? parseInt(d, 10) * i + "%" : d * i + "px"),
            null != u)
          ) {
            var p = u - (u - 1) * (1 - Math.abs(i));
            n[0].style.opacity = p;
          }
          if (null == c) n.transform("translate3d(" + l + ", " + d + ", 0px)");
          else {
            var h = c - (c - 1) * (1 - Math.abs(i));
            n.transform(
              "translate3d(" + l + ", " + d + ", 0px) scale(" + h + ")"
            );
          }
        },
        setTranslate: function () {
          var t = this,
            i = t.$el,
            a = t.slides,
            s = t.progress,
            n = t.snapGrid;
          i
            .children(
              "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
            )
            .each(function (e, i) {
              t.parallax.setTransform(i, s);
            }),
            a.each(function (i, a) {
              var r = a.progress;
              t.params.slidesPerGroup > 1 &&
                "auto" !== t.params.slidesPerView &&
                (r += Math.ceil(i / 2) - s * (n.length - 1)),
                (r = Math.min(Math.max(r, -1), 1)),
                e(a)
                  .find(
                    "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
                  )
                  .each(function (e, i) {
                    t.parallax.setTransform(i, r);
                  });
            });
        },
        setTransition: function (t) {
          void 0 === t && (t = this.params.speed),
            this.$el
              .find(
                "[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]"
              )
              .each(function (i, a) {
                var s = e(a),
                  n =
                    parseInt(s.attr("data-swiper-parallax-duration"), 10) || t;
                0 === t && (n = 0), s.transition(n);
              });
        },
      },
      K = {
        name: "parallax",
        params: { parallax: { enabled: !1 } },
        create: function () {
          var e = this;
          l.extend(e, {
            parallax: {
              setTransform: U.setTransform.bind(e),
              setTranslate: U.setTranslate.bind(e),
              setTransition: U.setTransition.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            this.params.watchSlidesProgress = !0;
          },
          init: function () {
            var e = this;
            e.params.parallax && e.parallax.setTranslate();
          },
          setTranslate: function () {
            var e = this;
            e.params.parallax && e.parallax.setTranslate();
          },
          setTransition: function (e) {
            var t = this;
            t.params.parallax && t.parallax.setTransition(e);
          },
        },
      },
      J = {
        getDistanceBetweenTouches: function (e) {
          if (e.targetTouches.length < 2) return 1;
          var t = e.targetTouches[0].pageX,
            i = e.targetTouches[0].pageY,
            a = e.targetTouches[1].pageX,
            s = e.targetTouches[1].pageY;
          return Math.sqrt(Math.pow(a - t, 2) + Math.pow(s - i, 2));
        },
        onGestureStart: function (t) {
          var i = this,
            a = i.params.zoom,
            s = i.zoom,
            n = s.gesture;
          if (
            ((s.fakeGestureTouched = !1),
            (s.fakeGestureMoved = !1),
            !c.gestures)
          ) {
            if (
              "touchstart" !== t.type ||
              ("touchstart" === t.type && t.targetTouches.length < 2)
            )
              return;
            (s.fakeGestureTouched = !0),
              (n.scaleStart = J.getDistanceBetweenTouches(t));
          }
          (n.$slideEl && n.$slideEl.length) ||
          ((n.$slideEl = e(this)),
          0 === n.$slideEl.length && (n.$slideEl = i.slides.eq(i.activeIndex)),
          (n.$imageEl = n.$slideEl.find("img, svg, canvas")),
          (n.$imageWrapEl = n.$imageEl.parent("." + a.containerClass)),
          (n.maxRatio = n.$imageWrapEl.attr("data-swiper-zoom") || a.maxRatio),
          0 !== n.$imageWrapEl.length)
            ? (n.$imageEl.transition(0), (i.zoom.isScaling = !0))
            : (n.$imageEl = void 0);
        },
        onGestureChange: function (e) {
          var t = this,
            i = t.params.zoom,
            a = t.zoom,
            s = a.gesture;
          if (!c.gestures) {
            if (
              "touchmove" !== e.type ||
              ("touchmove" === e.type && e.targetTouches.length < 2)
            )
              return;
            (a.fakeGestureMoved = !0),
              (s.scaleMove = J.getDistanceBetweenTouches(e));
          }
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            (c.gestures
              ? (t.zoom.scale = e.scale * a.currentScale)
              : (a.scale = (s.scaleMove / s.scaleStart) * a.currentScale),
            a.scale > s.maxRatio &&
              (a.scale =
                s.maxRatio - 1 + Math.pow(a.scale - s.maxRatio + 1, 0.5)),
            a.scale < i.minRatio &&
              (a.scale =
                i.minRatio + 1 - Math.pow(i.minRatio - a.scale + 1, 0.5)),
            s.$imageEl.transform("translate3d(0,0,0) scale(" + a.scale + ")"));
        },
        onGestureEnd: function (e) {
          var t = this,
            i = t.params.zoom,
            a = t.zoom,
            s = a.gesture;
          if (!c.gestures) {
            if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
            if (
              "touchend" !== e.type ||
              ("touchend" === e.type &&
                e.changedTouches.length < 2 &&
                !E.android)
            )
              return;
            (a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
          }
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((a.scale = Math.max(Math.min(a.scale, s.maxRatio), i.minRatio)),
            s.$imageEl
              .transition(t.params.speed)
              .transform("translate3d(0,0,0) scale(" + a.scale + ")"),
            (a.currentScale = a.scale),
            (a.isScaling = !1),
            1 === a.scale && (s.$slideEl = void 0));
        },
        onTouchStart: function (e) {
          var t = this.zoom,
            i = t.gesture,
            a = t.image;
          i.$imageEl &&
            0 !== i.$imageEl.length &&
            (a.isTouched ||
              (E.android && e.preventDefault(),
              (a.isTouched = !0),
              (a.touchesStart.x =
                "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
              (a.touchesStart.y =
                "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
        },
        onTouchMove: function (e) {
          var t = this,
            i = t.zoom,
            a = i.gesture,
            s = i.image,
            n = i.velocity;
          if (
            a.$imageEl &&
            0 !== a.$imageEl.length &&
            ((t.allowClick = !1), s.isTouched && a.$slideEl)
          ) {
            s.isMoved ||
              ((s.width = a.$imageEl[0].offsetWidth),
              (s.height = a.$imageEl[0].offsetHeight),
              (s.startX = l.getTranslate(a.$imageWrapEl[0], "x") || 0),
              (s.startY = l.getTranslate(a.$imageWrapEl[0], "y") || 0),
              (a.slideWidth = a.$slideEl[0].offsetWidth),
              (a.slideHeight = a.$slideEl[0].offsetHeight),
              a.$imageWrapEl.transition(0),
              t.rtl && (s.startX = -s.startX),
              t.rtl && (s.startY = -s.startY));
            var r = s.width * i.scale,
              o = s.height * i.scale;
            if (!(r < a.slideWidth && o < a.slideHeight)) {
              if (
                ((s.minX = Math.min(a.slideWidth / 2 - r / 2, 0)),
                (s.maxX = -s.minX),
                (s.minY = Math.min(a.slideHeight / 2 - o / 2, 0)),
                (s.maxY = -s.minY),
                (s.touchesCurrent.x =
                  "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                (s.touchesCurrent.y =
                  "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                !s.isMoved && !i.isScaling)
              ) {
                if (
                  t.isHorizontal() &&
                  ((Math.floor(s.minX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x < s.touchesStart.x) ||
                    (Math.floor(s.maxX) === Math.floor(s.startX) &&
                      s.touchesCurrent.x > s.touchesStart.x))
                )
                  return void (s.isTouched = !1);
                if (
                  !t.isHorizontal() &&
                  ((Math.floor(s.minY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y < s.touchesStart.y) ||
                    (Math.floor(s.maxY) === Math.floor(s.startY) &&
                      s.touchesCurrent.y > s.touchesStart.y))
                )
                  return void (s.isTouched = !1);
              }
              e.preventDefault(),
                e.stopPropagation(),
                (s.isMoved = !0),
                (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
                (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
                s.currentX < s.minX &&
                  (s.currentX =
                    s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
                s.currentX > s.maxX &&
                  (s.currentX =
                    s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
                s.currentY < s.minY &&
                  (s.currentY =
                    s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
                s.currentY > s.maxY &&
                  (s.currentY =
                    s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
                n.prevPositionX || (n.prevPositionX = s.touchesCurrent.x),
                n.prevPositionY || (n.prevPositionY = s.touchesCurrent.y),
                n.prevTime || (n.prevTime = Date.now()),
                (n.x =
                  (s.touchesCurrent.x - n.prevPositionX) /
                  (Date.now() - n.prevTime) /
                  2),
                (n.y =
                  (s.touchesCurrent.y - n.prevPositionY) /
                  (Date.now() - n.prevTime) /
                  2),
                Math.abs(s.touchesCurrent.x - n.prevPositionX) < 2 && (n.x = 0),
                Math.abs(s.touchesCurrent.y - n.prevPositionY) < 2 && (n.y = 0),
                (n.prevPositionX = s.touchesCurrent.x),
                (n.prevPositionY = s.touchesCurrent.y),
                (n.prevTime = Date.now()),
                a.$imageWrapEl.transform(
                  "translate3d(" + s.currentX + "px, " + s.currentY + "px,0)"
                );
            }
          }
        },
        onTouchEnd: function () {
          var e = this.zoom,
            t = e.gesture,
            i = e.image,
            a = e.velocity;
          if (t.$imageEl && 0 !== t.$imageEl.length) {
            if (!i.isTouched || !i.isMoved)
              return (i.isTouched = !1), void (i.isMoved = !1);
            (i.isTouched = !1), (i.isMoved = !1);
            var s = 300,
              n = 300,
              r = a.x * s,
              o = i.currentX + r,
              l = a.y * n,
              d = i.currentY + l;
            0 !== a.x && (s = Math.abs((o - i.currentX) / a.x)),
              0 !== a.y && (n = Math.abs((d - i.currentY) / a.y));
            var c = Math.max(s, n);
            (i.currentX = o), (i.currentY = d);
            var u = i.width * e.scale,
              p = i.height * e.scale;
            (i.minX = Math.min(t.slideWidth / 2 - u / 2, 0)),
              (i.maxX = -i.minX),
              (i.minY = Math.min(t.slideHeight / 2 - p / 2, 0)),
              (i.maxY = -i.minY),
              (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
              (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
              t.$imageWrapEl
                .transition(c)
                .transform(
                  "translate3d(" + i.currentX + "px, " + i.currentY + "px,0)"
                );
          }
        },
        onTransitionEnd: function () {
          var e = this,
            t = e.zoom,
            i = t.gesture;
          i.$slideEl &&
            e.previousIndex !== e.activeIndex &&
            (i.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            i.$imageWrapEl.transform("translate3d(0,0,0)"),
            (i.$slideEl = void 0),
            (i.$imageEl = void 0),
            (i.$imageWrapEl = void 0),
            (t.scale = 1),
            (t.currentScale = 1));
        },
        toggle: function (e) {
          var t = this.zoom;
          t.scale && 1 !== t.scale ? t.out() : t.in(e);
        },
        in: function (t) {
          var i = this,
            a = i.zoom,
            s = i.params.zoom,
            n = a.gesture,
            r = a.image,
            o,
            l,
            d,
            c,
            u,
            p,
            h,
            f,
            v,
            m,
            g,
            b,
            w,
            y,
            E,
            x;
          (n.$slideEl ||
            ((n.$slideEl = i.clickedSlide
              ? e(i.clickedSlide)
              : i.slides.eq(i.activeIndex)),
            (n.$imageEl = n.$slideEl.find("img, svg, canvas")),
            (n.$imageWrapEl = n.$imageEl.parent("." + s.containerClass))),
          n.$imageEl && 0 !== n.$imageEl.length) &&
            (n.$slideEl.addClass("" + s.zoomedSlideClass),
            void 0 === r.touchesStart.x && t
              ? ((o =
                  "touchend" === t.type ? t.changedTouches[0].pageX : t.pageX),
                (l =
                  "touchend" === t.type ? t.changedTouches[0].pageY : t.pageY))
              : ((o = r.touchesStart.x), (l = r.touchesStart.y)),
            (a.scale = n.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio),
            (a.currentScale =
              n.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio),
            t
              ? ((E = n.$slideEl[0].offsetWidth),
                (x = n.$slideEl[0].offsetHeight),
                (d = n.$slideEl.offset().left + E / 2 - o),
                (c = n.$slideEl.offset().top + x / 2 - l),
                (h = n.$imageEl[0].offsetWidth),
                (f = n.$imageEl[0].offsetHeight),
                (v = h * a.scale),
                (m = f * a.scale),
                (w = -(g = Math.min(E / 2 - v / 2, 0))),
                (y = -(b = Math.min(x / 2 - m / 2, 0))),
                (u = d * a.scale) < g && (u = g),
                u > w && (u = w),
                (p = c * a.scale) < b && (p = b),
                p > y && (p = y))
              : ((u = 0), (p = 0)),
            n.$imageWrapEl
              .transition(300)
              .transform("translate3d(" + u + "px, " + p + "px,0)"),
            n.$imageEl
              .transition(300)
              .transform("translate3d(0,0,0) scale(" + a.scale + ")"));
        },
        out: function () {
          var t = this,
            i = t.zoom,
            a = t.params.zoom,
            s = i.gesture;
          s.$slideEl ||
            ((s.$slideEl = t.clickedSlide
              ? e(t.clickedSlide)
              : t.slides.eq(t.activeIndex)),
            (s.$imageEl = s.$slideEl.find("img, svg, canvas")),
            (s.$imageWrapEl = s.$imageEl.parent("." + a.containerClass))),
            s.$imageEl &&
              0 !== s.$imageEl.length &&
              ((i.scale = 1),
              (i.currentScale = 1),
              s.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
              s.$imageEl
                .transition(300)
                .transform("translate3d(0,0,0) scale(1)"),
              s.$slideEl.removeClass("" + a.zoomedSlideClass),
              (s.$slideEl = void 0));
        },
        enable: function () {
          var t = this,
            i = t.zoom;
          if (!i.enabled) {
            i.enabled = !0;
            var a = t.slides,
              s = !(
                "touchstart" !== t.touchEvents.start ||
                !c.passiveListener ||
                !t.params.passiveListeners
              ) && { passive: !0, capture: !1 };
            c.gestures
              ? (a.on("gesturestart", i.onGestureStart, s),
                a.on("gesturechange", i.onGestureChange, s),
                a.on("gestureend", i.onGestureEnd, s))
              : "touchstart" === t.touchEvents.start &&
                (a.on(t.touchEvents.start, i.onGestureStart, s),
                a.on(t.touchEvents.move, i.onGestureChange, s),
                a.on(t.touchEvents.end, i.onGestureEnd, s)),
              t.slides.each(function (a, s) {
                var n = e(s);
                n.find("." + t.params.zoom.containerClass).length > 0 &&
                  n.on(t.touchEvents.move, i.onTouchMove);
              });
          }
        },
        disable: function () {
          var t = this,
            i = t.zoom;
          if (i.enabled) {
            t.zoom.enabled = !1;
            var a = t.slides,
              s = !(
                "touchstart" !== t.touchEvents.start ||
                !c.passiveListener ||
                !t.params.passiveListeners
              ) && { passive: !0, capture: !1 };
            c.gestures
              ? (a.off("gesturestart", i.onGestureStart, s),
                a.off("gesturechange", i.onGestureChange, s),
                a.off("gestureend", i.onGestureEnd, s))
              : "touchstart" === t.touchEvents.start &&
                (a.off(t.touchEvents.start, i.onGestureStart, s),
                a.off(t.touchEvents.move, i.onGestureChange, s),
                a.off(t.touchEvents.end, i.onGestureEnd, s)),
              t.slides.each(function (a, s) {
                var n = e(s);
                n.find("." + t.params.zoom.containerClass).length > 0 &&
                  n.off(t.touchEvents.move, i.onTouchMove);
              });
          }
        },
      },
      Q = {
        name: "zoom",
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: "swiper-zoom-container",
            zoomedSlideClass: "swiper-slide-zoomed",
          },
        },
        create: function () {
          var e = this,
            t = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              },
            };
          "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out"
            .split(" ")
            .forEach(function (i) {
              t[i] = J[i].bind(e);
            }),
            l.extend(e, { zoom: t });
        },
        on: {
          init: function () {
            var e = this;
            e.params.zoom.enabled && e.zoom.enable();
          },
          destroy: function () {
            this.zoom.disable();
          },
          touchStart: function (e) {
            var t = this;
            t.zoom.enabled && t.zoom.onTouchStart(e);
          },
          touchEnd: function (e) {
            var t = this;
            t.zoom.enabled && t.zoom.onTouchEnd(e);
          },
          doubleTap: function (e) {
            var t = this;
            t.params.zoom.enabled &&
              t.zoom.enabled &&
              t.params.zoom.toggle &&
              t.zoom.toggle(e);
          },
          transitionEnd: function () {
            var e = this;
            e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd();
          },
        },
      },
      Z = {
        loadInSlide: function (t, i) {
          void 0 === i && (i = !0);
          var a = this,
            s = a.params.lazy;
          if (void 0 !== t && 0 !== a.slides.length) {
            var n =
                a.virtual && a.params.virtual.enabled
                  ? a.$wrapperEl.children(
                      "." +
                        a.params.slideClass +
                        '[data-swiper-slide-index="' +
                        t +
                        '"]'
                    )
                  : a.slides.eq(t),
              r = n.find(
                "." +
                  s.elementClass +
                  ":not(." +
                  s.loadedClass +
                  "):not(." +
                  s.loadingClass +
                  ")"
              );
            !n.hasClass(s.elementClass) ||
              n.hasClass(s.loadedClass) ||
              n.hasClass(s.loadingClass) ||
              (r = r.add(n[0])),
              0 !== r.length &&
                r.each(function (t, r) {
                  var o = e(r);
                  o.addClass(s.loadingClass);
                  var l = o.attr("data-background"),
                    d = o.attr("data-src"),
                    c = o.attr("data-srcset"),
                    u = o.attr("data-sizes");
                  a.loadImage(o[0], d || l, c, u, !1, function () {
                    if (null != a && a && (!a || a.params) && !a.destroyed) {
                      if (
                        (l
                          ? (o.css("background-image", 'url("' + l + '")'),
                            o.removeAttr("data-background"))
                          : (c &&
                              (o.attr("srcset", c),
                              o.removeAttr("data-srcset")),
                            u &&
                              (o.attr("sizes", u), o.removeAttr("data-sizes")),
                            d && (o.attr("src", d), o.removeAttr("data-src"))),
                        o.addClass(s.loadedClass).removeClass(s.loadingClass),
                        n.find("." + s.preloaderClass).remove(),
                        a.params.loop && i)
                      ) {
                        var e = n.attr("data-swiper-slide-index");
                        if (n.hasClass(a.params.slideDuplicateClass)) {
                          var t = a.$wrapperEl.children(
                            '[data-swiper-slide-index="' +
                              e +
                              '"]:not(.' +
                              a.params.slideDuplicateClass +
                              ")"
                          );
                          a.lazy.loadInSlide(t.index(), !1);
                        } else {
                          var r = a.$wrapperEl.children(
                            "." +
                              a.params.slideDuplicateClass +
                              '[data-swiper-slide-index="' +
                              e +
                              '"]'
                          );
                          a.lazy.loadInSlide(r.index(), !1);
                        }
                      }
                      a.emit("lazyImageReady", n[0], o[0]);
                    }
                  }),
                    a.emit("lazyImageLoad", n[0], o[0]);
                });
          }
        },
        load: function () {
          function t(e) {
            if (l) {
              if (
                s.children(
                  "." + n.slideClass + '[data-swiper-slide-index="' + e + '"]'
                ).length
              )
                return !0;
            } else if (r[e]) return !0;
            return !1;
          }
          function i(t) {
            return l ? e(t).attr("data-swiper-slide-index") : e(t).index();
          }
          var a = this,
            s = a.$wrapperEl,
            n = a.params,
            r = a.slides,
            o = a.activeIndex,
            l = a.virtual && n.virtual.enabled,
            d = n.lazy,
            c = n.slidesPerView;
          if (
            ("auto" === c && (c = 0),
            a.lazy.initialImageLoaded || (a.lazy.initialImageLoaded = !0),
            a.params.watchSlidesVisibility)
          )
            s.children("." + n.slideVisibleClass).each(function (t, i) {
              var s = l ? e(i).attr("data-swiper-slide-index") : e(i).index();
              a.lazy.loadInSlide(s);
            });
          else if (c > 1)
            for (var u = o; u < o + c; u += 1) t(u) && a.lazy.loadInSlide(u);
          else a.lazy.loadInSlide(o);
          if (d.loadPrevNext)
            if (c > 1 || (d.loadPrevNextAmount && d.loadPrevNextAmount > 1)) {
              for (
                var p = d.loadPrevNextAmount,
                  h = c,
                  f = Math.min(o + h + Math.max(p, h), r.length),
                  v = Math.max(o - Math.max(h, p), 0),
                  m = o + c;
                m < f;
                m += 1
              )
                t(m) && a.lazy.loadInSlide(m);
              for (var g = v; g < o; g += 1) t(g) && a.lazy.loadInSlide(g);
            } else {
              var b = s.children("." + n.slideNextClass);
              b.length > 0 && a.lazy.loadInSlide(i(b));
              var w = s.children("." + n.slidePrevClass);
              w.length > 0 && a.lazy.loadInSlide(i(w));
            }
        },
      },
      ee = {
        name: "lazy",
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: "swiper-lazy",
            loadingClass: "swiper-lazy-loading",
            loadedClass: "swiper-lazy-loaded",
            preloaderClass: "swiper-lazy-preloader",
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            lazy: {
              initialImageLoaded: !1,
              load: Z.load.bind(e),
              loadInSlide: Z.loadInSlide.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            e.params.lazy.enabled &&
              e.params.preloadImages &&
              (e.params.preloadImages = !1);
          },
          init: function () {
            var e = this;
            e.params.lazy.enabled &&
              !e.params.loop &&
              0 === e.params.initialSlide &&
              e.lazy.load();
          },
          scroll: function () {
            var e = this;
            e.params.freeMode && !e.params.freeModeSticky && e.lazy.load();
          },
          resize: function () {
            var e = this;
            e.params.lazy.enabled && e.lazy.load();
          },
          scrollbarDragMove: function () {
            var e = this;
            e.params.lazy.enabled && e.lazy.load();
          },
          transitionStart: function () {
            var e = this;
            e.params.lazy.enabled &&
              (e.params.lazy.loadOnTransitionStart ||
                (!e.params.lazy.loadOnTransitionStart &&
                  !e.lazy.initialImageLoaded)) &&
              e.lazy.load();
          },
          transitionEnd: function () {
            var e = this;
            e.params.lazy.enabled &&
              !e.params.lazy.loadOnTransitionStart &&
              e.lazy.load();
          },
        },
      },
      te = {
        LinearSpline: function (e, t) {
          var i = (function () {
              var e, t, i;
              return function (a, s) {
                for (t = -1, e = a.length; e - t > 1; )
                  a[(i = (e + t) >> 1)] <= s ? (t = i) : (e = i);
                return e;
              };
            })(),
            a,
            s;
          return (
            (this.x = e),
            (this.y = t),
            (this.lastIndex = e.length - 1),
            (this.interpolate = function (e) {
              return e
                ? ((s = i(this.x, e)),
                  (a = s - 1),
                  ((e - this.x[a]) * (this.y[s] - this.y[a])) /
                    (this.x[s] - this.x[a]) +
                    this.y[a])
                : 0;
            }),
            this
          );
        },
        getInterpolateFunction: function (e) {
          var t = this;
          t.controller.spline ||
            (t.controller.spline = t.params.loop
              ? new te.LinearSpline(t.slidesGrid, e.slidesGrid)
              : new te.LinearSpline(t.snapGrid, e.snapGrid));
        },
        setTranslate: function (e, t) {
          function i(e) {
            var t =
              e.rtl && "horizontal" === e.params.direction
                ? -n.translate
                : n.translate;
            "slide" === n.params.controller.by &&
              (n.controller.getInterpolateFunction(e),
              (s = -n.controller.spline.interpolate(-t))),
              (s && "container" !== n.params.controller.by) ||
                ((a =
                  (e.maxTranslate() - e.minTranslate()) /
                  (n.maxTranslate() - n.minTranslate())),
                (s = (t - n.minTranslate()) * a + e.minTranslate())),
              n.params.controller.inverse && (s = e.maxTranslate() - s),
              e.updateProgress(s),
              e.setTranslate(s, n),
              e.updateActiveIndex(),
              e.updateSlidesClasses();
          }
          var a,
            s,
            n = this,
            r = n.controller.control;
          if (Array.isArray(r))
            for (var o = 0; o < r.length; o += 1)
              r[o] !== t && r[o] instanceof z && i(r[o]);
          else r instanceof z && t !== r && i(r);
        },
        setTransition: function (e, t) {
          function i(t) {
            t.setTransition(e, s),
              0 !== e &&
                (t.transitionStart(),
                t.$wrapperEl.transitionEnd(function () {
                  n &&
                    (t.params.loop &&
                      "slide" === s.params.controller.by &&
                      t.loopFix(),
                    t.transitionEnd());
                }));
          }
          var a,
            s = this,
            n = s.controller.control;
          if (Array.isArray(n))
            for (a = 0; a < n.length; a += 1)
              n[a] !== t && n[a] instanceof z && i(n[a]);
          else n instanceof z && t !== n && i(n);
        },
      },
      ie = {
        name: "controller",
        params: { controller: { control: void 0, inverse: !1, by: "slide" } },
        create: function () {
          var e = this;
          l.extend(e, {
            controller: {
              control: e.params.controller.control,
              getInterpolateFunction: te.getInterpolateFunction.bind(e),
              setTranslate: te.setTranslate.bind(e),
              setTransition: te.setTransition.bind(e),
            },
          });
        },
        on: {
          update: function () {
            var e = this;
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          resize: function () {
            var e = this;
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          observerUpdate: function () {
            var e = this;
            e.controller.control &&
              e.controller.spline &&
              ((e.controller.spline = void 0), delete e.controller.spline);
          },
          setTranslate: function (e, t) {
            var i = this;
            i.controller.control && i.controller.setTranslate(e, t);
          },
          setTransition: function (e, t) {
            var i = this;
            i.controller.control && i.controller.setTransition(e, t);
          },
        },
      },
      ae = {
        makeElFocusable: function (e) {
          return e.attr("tabIndex", "0"), e;
        },
        addElRole: function (e, t) {
          return e.attr("role", t), e;
        },
        addElLabel: function (e, t) {
          return e.attr("aria-label", t), e;
        },
        disableEl: function (e) {
          return e.attr("aria-disabled", !0), e;
        },
        enableEl: function (e) {
          return e.attr("aria-disabled", !1), e;
        },
        onEnterKey: function (t) {
          var i = this,
            a = i.params.a11y;
          if (13 === t.keyCode) {
            var s = e(t.target);
            i.navigation &&
              i.navigation.$nextEl &&
              s.is(i.navigation.$nextEl) &&
              ((i.isEnd && !i.params.loop) || i.slideNext(),
              i.isEnd
                ? i.a11y.notify(a.lastSlideMessage)
                : i.a11y.notify(a.nextSlideMessage)),
              i.navigation &&
                i.navigation.$prevEl &&
                s.is(i.navigation.$prevEl) &&
                ((i.isBeginning && !i.params.loop) || i.slidePrev(),
                i.isBeginning
                  ? i.a11y.notify(a.firstSlideMessage)
                  : i.a11y.notify(a.prevSlideMessage)),
              i.pagination &&
                s.is("." + i.params.pagination.bulletClass) &&
                s[0].click();
          }
        },
        notify: function (e) {
          var t = this.a11y.liveRegion;
          0 !== t.length && (t.html(""), t.html(e));
        },
        updateNavigation: function () {
          var e = this;
          if (!e.params.loop) {
            var t = e.navigation,
              i = t.$nextEl,
              a = t.$prevEl;
            a &&
              a.length > 0 &&
              (e.isBeginning ? e.a11y.disableEl(a) : e.a11y.enableEl(a)),
              i &&
                i.length > 0 &&
                (e.isEnd ? e.a11y.disableEl(i) : e.a11y.enableEl(i));
          }
        },
        updatePagination: function () {
          var t = this,
            i = t.params.a11y;
          t.pagination &&
            t.params.pagination.clickable &&
            t.pagination.bullets &&
            t.pagination.bullets.length &&
            t.pagination.bullets.each(function (a, s) {
              var n = e(s);
              t.a11y.makeElFocusable(n),
                t.a11y.addElRole(n, "button"),
                t.a11y.addElLabel(
                  n,
                  i.paginationBulletMessage.replace(/{{index}}/, n.index() + 1)
                );
            });
        },
        init: function () {
          var e = this;
          e.$el.append(e.a11y.liveRegion);
          var t,
            i,
            a = e.params.a11y;
          e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t &&
              (e.a11y.makeElFocusable(t),
              e.a11y.addElRole(t, "button"),
              e.a11y.addElLabel(t, a.nextSlideMessage),
              t.on("keydown", e.a11y.onEnterKey)),
            i &&
              (e.a11y.makeElFocusable(i),
              e.a11y.addElRole(i, "button"),
              e.a11y.addElLabel(i, a.prevSlideMessage),
              i.on("keydown", e.a11y.onEnterKey)),
            e.pagination &&
              e.params.pagination.clickable &&
              e.pagination.bullets &&
              e.pagination.bullets.length &&
              e.pagination.$el.on(
                "keydown",
                "." + e.params.pagination.bulletClass,
                e.a11y.onEnterKey
              );
        },
        destroy: function () {
          var e = this,
            t,
            i;
          e.a11y.liveRegion &&
            e.a11y.liveRegion.length > 0 &&
            e.a11y.liveRegion.remove(),
            e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (i = e.navigation.$prevEl),
            t && t.off("keydown", e.a11y.onEnterKey),
            i && i.off("keydown", e.a11y.onEnterKey),
            e.pagination &&
              e.params.pagination.clickable &&
              e.pagination.bullets &&
              e.pagination.bullets.length &&
              e.pagination.$el.off(
                "keydown",
                "." + e.params.pagination.bulletClass,
                e.a11y.onEnterKey
              );
        },
      },
      se = {
        name: "a11y",
        params: {
          a11y: {
            enabled: !1,
            notificationClass: "swiper-notification",
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
          },
        },
        create: function () {
          var t = this;
          l.extend(t, {
            a11y: {
              liveRegion: e(
                '<span class="' +
                  t.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>'
              ),
            },
          }),
            Object.keys(ae).forEach(function (e) {
              t.a11y[e] = ae[e].bind(t);
            });
        },
        on: {
          init: function () {
            var e = this;
            e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation());
          },
          toEdge: function () {
            var e = this;
            e.params.a11y.enabled && e.a11y.updateNavigation();
          },
          fromEdge: function () {
            var e = this;
            e.params.a11y.enabled && e.a11y.updateNavigation();
          },
          paginationUpdate: function () {
            var e = this;
            e.params.a11y.enabled && e.a11y.updatePagination();
          },
          destroy: function () {
            var e = this;
            e.params.a11y.enabled && e.a11y.destroy();
          },
        },
      },
      ne = {
        init: function () {
          var e = this;
          if (e.params.history) {
            if (!s.history || !s.history.pushState)
              return (
                (e.params.history.enabled = !1),
                void (e.params.hashNavigation.enabled = !0)
              );
            var t = e.history;
            (t.initialized = !0),
              (t.paths = ne.getPathValues()),
              (t.paths.key || t.paths.value) &&
                (t.scrollToSlide(0, t.paths.value, e.params.runCallbacksOnInit),
                e.params.history.replaceState ||
                  s.addEventListener("popstate", e.history.setHistoryPopState));
          }
        },
        destroy: function () {
          var e = this;
          e.params.history.replaceState ||
            s.removeEventListener("popstate", e.history.setHistoryPopState);
        },
        setHistoryPopState: function () {
          var e = this;
          (e.history.paths = ne.getPathValues()),
            e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1);
        },
        getPathValues: function () {
          var e = s.location.pathname
              .slice(1)
              .split("/")
              .filter(function (e) {
                return "" !== e;
              }),
            t = e.length;
          return { key: e[t - 2], value: e[t - 1] };
        },
        setHistory: function (e, t) {
          var i = this;
          if (i.history.initialized && i.params.history.enabled) {
            var a = i.slides.eq(t),
              n = ne.slugify(a.attr("data-history"));
            s.location.pathname.includes(e) || (n = e + "/" + n);
            var r = s.history.state;
            (r && r.value === n) ||
              (i.params.history.replaceState
                ? s.history.replaceState({ value: n }, null, n)
                : s.history.pushState({ value: n }, null, n));
          }
        },
        slugify: function (e) {
          return e
            .toString()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .replace(/--+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
        },
        scrollToSlide: function (e, t, i) {
          var a = this;
          if (t)
            for (var s = 0, n = a.slides.length; s < n; s += 1) {
              var r = a.slides.eq(s);
              if (
                ne.slugify(r.attr("data-history")) === t &&
                !r.hasClass(a.params.slideDuplicateClass)
              ) {
                var o = r.index();
                a.slideTo(o, e, i);
              }
            }
          else a.slideTo(0, e, i);
        },
      },
      re = {
        name: "history",
        params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
        create: function () {
          var e = this;
          l.extend(e, {
            history: {
              init: ne.init.bind(e),
              setHistory: ne.setHistory.bind(e),
              setHistoryPopState: ne.setHistoryPopState.bind(e),
              scrollToSlide: ne.scrollToSlide.bind(e),
              destroy: ne.destroy.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.params.history.enabled && e.history.init();
          },
          destroy: function () {
            var e = this;
            e.params.history.enabled && e.history.destroy();
          },
          transitionEnd: function () {
            var e = this;
            e.history.initialized &&
              e.history.setHistory(e.params.history.key, e.activeIndex);
          },
        },
      },
      oe = {
        onHashCange: function () {
          var e = this,
            t = d.location.hash.replace("#", "");
          t !== e.slides.eq(e.activeIndex).attr("data-hash") &&
            e.slideTo(
              e.$wrapperEl
                .children("." + e.params.slideClass + '[data-hash="' + t + '"]')
                .index()
            );
        },
        setHash: function () {
          var e = this;
          if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
            if (
              e.params.hashNavigation.replaceState &&
              s.history &&
              s.history.replaceState
            )
              s.history.replaceState(
                null,
                null,
                "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""
              );
            else {
              var t = e.slides.eq(e.activeIndex),
                i = t.attr("data-hash") || t.attr("data-history");
              d.location.hash = i || "";
            }
        },
        init: function () {
          var t = this;
          if (
            !(
              !t.params.hashNavigation.enabled ||
              (t.params.history && t.params.history.enabled)
            )
          ) {
            t.hashNavigation.initialized = !0;
            var i = d.location.hash.replace("#", "");
            if (i)
              for (var a = 0, n = t.slides.length; a < n; a += 1) {
                var r = t.slides.eq(a);
                if (
                  (r.attr("data-hash") || r.attr("data-history")) === i &&
                  !r.hasClass(t.params.slideDuplicateClass)
                ) {
                  var o = r.index();
                  t.slideTo(o, 0, t.params.runCallbacksOnInit, !0);
                }
              }
            t.params.hashNavigation.watchState &&
              e(s).on("hashchange", t.hashNavigation.onHashCange);
          }
        },
        destroy: function () {
          var t = this;
          t.params.hashNavigation.watchState &&
            e(s).off("hashchange", t.hashNavigation.onHashCange);
        },
      },
      le = {
        name: "hash-navigation",
        params: {
          hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            hashNavigation: {
              initialized: !1,
              init: oe.init.bind(e),
              destroy: oe.destroy.bind(e),
              setHash: oe.setHash.bind(e),
              onHashCange: oe.onHashCange.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.params.hashNavigation.enabled && e.hashNavigation.init();
          },
          destroy: function () {
            var e = this;
            e.params.hashNavigation.enabled && e.hashNavigation.destroy();
          },
          transitionEnd: function () {
            var e = this;
            e.hashNavigation.initialized && e.hashNavigation.setHash();
          },
        },
      },
      de = {
        run: function () {
          var e = this,
            t = e.slides.eq(e.activeIndex),
            i = e.params.autoplay.delay;
          t.attr("data-swiper-autoplay") &&
            (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
            (e.autoplay.timeout = l.nextTick(function () {
              e.params.loop
                ? (e.loopFix(),
                  e.slideNext(e.params.speed, !0, !0),
                  e.emit("autoplay"))
                : e.isEnd
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
                : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
            }, i));
        },
        start: function () {
          var e = this;
          return (
            void 0 === e.autoplay.timeout &&
            !e.autoplay.running &&
            ((e.autoplay.running = !0),
            e.emit("autoplayStart"),
            e.autoplay.run(),
            !0)
          );
        },
        stop: function () {
          var e = this;
          return (
            !!e.autoplay.running &&
            void 0 !== e.autoplay.timeout &&
            (e.autoplay.timeout &&
              (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
            (e.autoplay.running = !1),
            e.emit("autoplayStop"),
            !0)
          );
        },
        pause: function (e) {
          var t = this;
          t.autoplay.running &&
            (t.autoplay.paused ||
              (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
              (t.autoplay.paused = !0),
              0 === e
                ? ((t.autoplay.paused = !1), t.autoplay.run())
                : t.$wrapperEl.transitionEnd(function () {
                    t &&
                      !t.destroyed &&
                      ((t.autoplay.paused = !1),
                      t.autoplay.running
                        ? t.autoplay.run()
                        : t.autoplay.stop());
                  })));
        },
      },
      ce = {
        name: "autoplay",
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            autoplay: {
              running: !1,
              paused: !1,
              run: de.run.bind(e),
              start: de.start.bind(e),
              stop: de.stop.bind(e),
              pause: de.pause.bind(e),
            },
          });
        },
        on: {
          init: function () {
            var e = this;
            e.params.autoplay.enabled && e.autoplay.start();
          },
          beforeTransitionStart: function (e, t) {
            var i = this;
            i.autoplay.running &&
              (t || !i.params.autoplay.disableOnInteraction
                ? i.autoplay.pause(e)
                : i.autoplay.stop());
          },
          sliderFirstMove: function () {
            var e = this;
            e.autoplay.running &&
              (e.params.autoplay.disableOnInteraction
                ? e.autoplay.stop()
                : e.autoplay.pause());
          },
          destroy: function () {
            var e = this;
            e.autoplay.running && e.autoplay.stop();
          },
        },
      },
      ue = {
        setTranslate: function () {
          for (var e = this, t = e.slides, i = 0; i < t.length; i += 1) {
            var a = e.slides.eq(i),
              s = -a[0].swiperSlideOffset;
            e.params.virtualTranslate || (s -= e.translate);
            var n = 0;
            e.isHorizontal() || ((n = s), (s = 0));
            var r = e.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(a[0].progress), 0)
              : 1 + Math.min(Math.max(a[0].progress, -1), 0);
            a.css({ opacity: r }).transform(
              "translate3d(" + s + "px, " + n + "px, 0px)"
            );
          }
        },
        setTransition: function (e) {
          var t = this,
            i = t.slides,
            a = t.$wrapperEl;
          if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
            var s = !1;
            i.transitionEnd(function () {
              if (!s && t && !t.destroyed) {
                (s = !0), (t.animating = !1);
                for (
                  var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < e.length;
                  i += 1
                )
                  a.trigger(e[i]);
              }
            });
          }
        },
      },
      pe = {
        name: "effect-fade",
        params: { fadeEffect: { crossFade: !1 } },
        create: function () {
          var e = this;
          l.extend(e, {
            fadeEffect: {
              setTranslate: ue.setTranslate.bind(e),
              setTransition: ue.setTransition.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("fade" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "fade");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              l.extend(e.params, t), l.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            var e = this;
            "fade" === e.params.effect && e.fadeEffect.setTranslate();
          },
          setTransition: function (e) {
            var t = this;
            "fade" === t.params.effect && t.fadeEffect.setTransition(e);
          },
        },
      },
      he = {
        setTranslate: function () {
          var t,
            i = this,
            a = i.$el,
            s = i.$wrapperEl,
            n = i.slides,
            r = i.width,
            o = i.height,
            l = i.rtl,
            d = i.size,
            c = i.params.cubeEffect,
            u = i.isHorizontal(),
            p = i.virtual && i.params.virtual.enabled,
            h = 0;
          c.shadow &&
            (u
              ? (0 === (t = s.find(".swiper-cube-shadow")).length &&
                  ((t = e('<div class="swiper-cube-shadow"></div>')),
                  s.append(t)),
                t.css({ height: r + "px" }))
              : 0 === (t = a.find(".swiper-cube-shadow")).length &&
                ((t = e('<div class="swiper-cube-shadow"></div>')),
                a.append(t)));
          for (var f = 0; f < n.length; f += 1) {
            var v = n.eq(f),
              g = f;
            p && (g = parseInt(v.attr("data-swiper-slide-index"), 10));
            var b = 90 * g,
              w = Math.floor(b / 360);
            l && ((b = -b), (w = Math.floor(-b / 360)));
            var y = Math.max(Math.min(v[0].progress, 1), -1),
              E = 0,
              x = 0,
              S = 0;
            g % 4 == 0
              ? ((E = 4 * -w * d), (S = 0))
              : (g - 1) % 4 == 0
              ? ((E = 0), (S = 4 * -w * d))
              : (g - 2) % 4 == 0
              ? ((E = d + 4 * w * d), (S = d))
              : (g - 3) % 4 == 0 && ((E = -d), (S = 3 * d + 4 * d * w)),
              l && (E = -E),
              u || ((x = E), (E = 0));
            var T =
              "rotateX(" +
              (u ? 0 : -b) +
              "deg) rotateY(" +
              (u ? b : 0) +
              "deg) translate3d(" +
              E +
              "px, " +
              x +
              "px, " +
              S +
              "px)";
            if (
              (y <= 1 &&
                y > -1 &&
                ((h = 90 * g + 90 * y), l && (h = 90 * -g - 90 * y)),
              v.transform(T),
              c.slideShadows)
            ) {
              var C = u
                  ? v.find(".swiper-slide-shadow-left")
                  : v.find(".swiper-slide-shadow-top"),
                $ = u
                  ? v.find(".swiper-slide-shadow-right")
                  : v.find(".swiper-slide-shadow-bottom");
              0 === C.length &&
                ((C = e(
                  '<div class="swiper-slide-shadow-' +
                    (u ? "left" : "top") +
                    '"></div>'
                )),
                v.append(C)),
                0 === $.length &&
                  (($ = e(
                    '<div class="swiper-slide-shadow-' +
                      (u ? "right" : "bottom") +
                      '"></div>'
                  )),
                  v.append($)),
                C.length && (C[0].style.opacity = Math.max(-y, 0)),
                $.length && ($[0].style.opacity = Math.max(y, 0));
            }
          }
          if (
            (s.css({
              "-webkit-transform-origin": "50% 50% -" + d / 2 + "px",
              "-moz-transform-origin": "50% 50% -" + d / 2 + "px",
              "-ms-transform-origin": "50% 50% -" + d / 2 + "px",
              "transform-origin": "50% 50% -" + d / 2 + "px",
            }),
            c.shadow)
          )
            if (u)
              t.transform(
                "translate3d(0px, " +
                  (r / 2 + c.shadowOffset) +
                  "px, " +
                  -r / 2 +
                  "px) rotateX(90deg) rotateZ(0deg) scale(" +
                  c.shadowScale +
                  ")"
              );
            else {
              var M = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
                k =
                  1.5 -
                  (Math.sin((2 * M * Math.PI) / 360) / 2 +
                    Math.cos((2 * M * Math.PI) / 360) / 2),
                L = c.shadowScale,
                z = c.shadowScale / k,
                P = c.shadowOffset;
              t.transform(
                "scale3d(" +
                  L +
                  ", 1, " +
                  z +
                  ") translate3d(0px, " +
                  (o / 2 + P) +
                  "px, " +
                  -o / 2 / z +
                  "px) rotateX(-90deg)"
              );
            }
          var I = m.isSafari || m.isUiWebView ? -d / 2 : 0;
          s.transform(
            "translate3d(0px,0," +
              I +
              "px) rotateX(" +
              (i.isHorizontal() ? 0 : h) +
              "deg) rotateY(" +
              (i.isHorizontal() ? -h : 0) +
              "deg)"
          );
        },
        setTransition: function (e) {
          var t = this,
            i = t.$el;
          t.slides
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e),
            t.params.cubeEffect.shadow &&
              !t.isHorizontal() &&
              i.find(".swiper-cube-shadow").transition(e);
        },
      },
      fe = {
        name: "effect-cube",
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            cubeEffect: {
              setTranslate: he.setTranslate.bind(e),
              setTransition: he.setTransition.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("cube" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "cube"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              l.extend(e.params, t), l.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            var e = this;
            "cube" === e.params.effect && e.cubeEffect.setTranslate();
          },
          setTransition: function (e) {
            var t = this;
            "cube" === t.params.effect && t.cubeEffect.setTransition(e);
          },
        },
      },
      ve = {
        setTranslate: function () {
          for (var t = this, i = t.slides, a = 0; a < i.length; a += 1) {
            var s = i.eq(a),
              n = s[0].progress;
            t.params.flipEffect.limitRotation &&
              (n = Math.max(Math.min(s[0].progress, 1), -1));
            var r = -180 * n,
              o = 0,
              l = -s[0].swiperSlideOffset,
              d = 0;
            if (
              (t.isHorizontal()
                ? t.rtl && (r = -r)
                : ((d = l), (l = 0), (o = -r), (r = 0)),
              (s[0].style.zIndex = -Math.abs(Math.round(n)) + i.length),
              t.params.flipEffect.slideShadows)
            ) {
              var c = t.isHorizontal()
                  ? s.find(".swiper-slide-shadow-left")
                  : s.find(".swiper-slide-shadow-top"),
                u = t.isHorizontal()
                  ? s.find(".swiper-slide-shadow-right")
                  : s.find(".swiper-slide-shadow-bottom");
              0 === c.length &&
                ((c = e(
                  '<div class="swiper-slide-shadow-' +
                    (t.isHorizontal() ? "left" : "top") +
                    '"></div>'
                )),
                s.append(c)),
                0 === u.length &&
                  ((u = e(
                    '<div class="swiper-slide-shadow-' +
                      (t.isHorizontal() ? "right" : "bottom") +
                      '"></div>'
                  )),
                  s.append(u)),
                c.length && (c[0].style.opacity = Math.max(-n, 0)),
                u.length && (u[0].style.opacity = Math.max(n, 0));
            }
            s.transform(
              "translate3d(" +
                l +
                "px, " +
                d +
                "px, 0px) rotateX(" +
                o +
                "deg) rotateY(" +
                r +
                "deg)"
            );
          }
        },
        setTransition: function (e) {
          var t = this,
            i = t.slides,
            a = t.activeIndex,
            s = t.$wrapperEl;
          if (
            (i
              .transition(e)
              .find(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .transition(e),
            t.params.virtualTranslate && 0 !== e)
          ) {
            var n = !1;
            i.eq(a).transitionEnd(function () {
              if (!n && t && !t.destroyed) {
                (n = !0), (t.animating = !1);
                for (
                  var e = ["webkitTransitionEnd", "transitionend"], i = 0;
                  i < e.length;
                  i += 1
                )
                  s.trigger(e[i]);
              }
            });
          }
        },
      },
      me = {
        name: "effect-flip",
        params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
        create: function () {
          var e = this;
          l.extend(e, {
            flipEffect: {
              setTranslate: ve.setTranslate.bind(e),
              setTransition: ve.setTransition.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            if ("flip" === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + "flip"),
                e.classNames.push(e.params.containerModifierClass + "3d");
              var t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              l.extend(e.params, t), l.extend(e.originalParams, t);
            }
          },
          setTranslate: function () {
            var e = this;
            "flip" === e.params.effect && e.flipEffect.setTranslate();
          },
          setTransition: function (e) {
            var t = this;
            "flip" === t.params.effect && t.flipEffect.setTransition(e);
          },
        },
      },
      ge = {
        setTranslate: function () {
          for (
            var t = this,
              i = t.width,
              a = t.height,
              s = t.slides,
              n = t.$wrapperEl,
              r = t.slidesSizesGrid,
              o = t.params.coverflowEffect,
              l = t.isHorizontal(),
              d = t.translate,
              c = l ? i / 2 - d : a / 2 - d,
              u = l ? o.rotate : -o.rotate,
              p = o.depth,
              h = 0,
              f = s.length;
            h < f;
            h += 1
          ) {
            var v = s.eq(h),
              g = r[h],
              b = ((c - v[0].swiperSlideOffset - g / 2) / g) * o.modifier,
              w = l ? u * b : 0,
              y = l ? 0 : u * b,
              E = -p * Math.abs(b),
              x = l ? 0 : o.stretch * b,
              S = l ? o.stretch * b : 0;
            Math.abs(S) < 0.001 && (S = 0),
              Math.abs(x) < 0.001 && (x = 0),
              Math.abs(E) < 0.001 && (E = 0),
              Math.abs(w) < 0.001 && (w = 0),
              Math.abs(y) < 0.001 && (y = 0);
            var T =
              "translate3d(" +
              S +
              "px," +
              x +
              "px," +
              E +
              "px)  rotateX(" +
              y +
              "deg) rotateY(" +
              w +
              "deg)";
            if (
              (v.transform(T),
              (v[0].style.zIndex = 1 - Math.abs(Math.round(b))),
              o.slideShadows)
            ) {
              var C = l
                  ? v.find(".swiper-slide-shadow-left")
                  : v.find(".swiper-slide-shadow-top"),
                $ = l
                  ? v.find(".swiper-slide-shadow-right")
                  : v.find(".swiper-slide-shadow-bottom");
              0 === C.length &&
                ((C = e(
                  '<div class="swiper-slide-shadow-' +
                    (l ? "left" : "top") +
                    '"></div>'
                )),
                v.append(C)),
                0 === $.length &&
                  (($ = e(
                    '<div class="swiper-slide-shadow-' +
                      (l ? "right" : "bottom") +
                      '"></div>'
                  )),
                  v.append($)),
                C.length && (C[0].style.opacity = b > 0 ? b : 0),
                $.length && ($[0].style.opacity = -b > 0 ? -b : 0);
            }
          }
          m.ie && (n[0].style.perspectiveOrigin = c + "px 50%");
        },
        setTransition: function (e) {
          this.slides
            .transition(e)
            .find(
              ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
            )
            .transition(e);
        },
      },
      be = {
        name: "effect-coverflow",
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function () {
          var e = this;
          l.extend(e, {
            coverflowEffect: {
              setTranslate: ge.setTranslate.bind(e),
              setTransition: ge.setTransition.bind(e),
            },
          });
        },
        on: {
          beforeInit: function () {
            var e = this;
            "coverflow" === e.params.effect &&
              (e.classNames.push(e.params.containerModifierClass + "coverflow"),
              e.classNames.push(e.params.containerModifierClass + "3d"),
              (e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function () {
            var e = this;
            "coverflow" === e.params.effect && e.coverflowEffect.setTranslate();
          },
          setTransition: function (e) {
            var t = this;
            "coverflow" === t.params.effect &&
              t.coverflowEffect.setTransition(e);
          },
        },
      };
    return (
      z.use([
        P,
        I,
        A,
        D,
        j,
        B,
        q,
        G,
        R,
        _,
        W,
        K,
        Q,
        ee,
        ie,
        se,
        re,
        le,
        ce,
        pe,
        fe,
        me,
        be,
      ]),
      z
    );
  }),
  (function () {
    var e = 9;
    if ("undefined" != typeof Element && !Element.prototype.matches) {
      var t = Element.prototype;
      t.matches =
        t.matchesSelector ||
        t.mozMatchesSelector ||
        t.msMatchesSelector ||
        t.oMatchesSelector ||
        t.webkitMatchesSelector;
    }
    function i(e, t) {
      for (; e && 9 !== e.nodeType; ) {
        if ("function" == typeof e.matches && e.matches(t)) return e;
        e = e.parentNode;
      }
    }
    function a(e, t, i, a, s) {
      var r = n.apply(this, arguments);
      return (
        e.addEventListener(i, r, s),
        {
          destroy: function () {
            e.removeEventListener(i, r, s);
          },
        }
      );
    }
    function s(e, t, i, s, n) {
      return "function" == typeof e.addEventListener
        ? a.apply(null, arguments)
        : "function" == typeof i
        ? a.bind(null, document).apply(null, arguments)
        : ("string" == typeof e && (e = document.querySelectorAll(e)),
          Array.prototype.map.call(e, function (e) {
            return a(e, t, i, s, n);
          }));
    }
    function n(e, t, a, s) {
      return function (a) {
        (a.delegateTarget = i(a.target, t)), a.delegateTarget && s.call(e, a);
      };
    }
    window.delegate = s;
  })(),
  (Bumble.throttle = function (e, t) {
    var i;
    return function () {
      i ||
        (i = setTimeout(function () {
          (i = void 0), e();
        }, t));
    };
  }),
  (function () {
    var e = document.querySelector(".js-icons-svg");
    if (e) {
      var t = e.getAttribute("data-url"),
        i = "cache_svg_" + t;
      if (window.localStorage) {
        var a = localStorage.getItem(i);
        if (null !== a) return void (e.innerHTML = a);
      }
      var s = new XMLHttpRequest();
      s.open("GET", t),
        (s.onreadystatechange = function () {
          if (s.readyState === XMLHttpRequest.DONE && 200 === s.status) {
            var t = s.responseText;
            e.innerHTML = t;
            try {
              window.localStorage.setItem(i, t);
            } catch (e) {}
          }
        }),
        s.send();
    }
  })(),
  window.navigator &&
    window.navigator.serviceWorker &&
    window.navigator.serviceWorker.addEventListener("message", function (e) {
      var t = JSON.parse(e.data);
      t.url && (window.location = t.url);
    }),
  document.addEventListener("DOMContentLoaded", AppInit);
