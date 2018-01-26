angular.module("angular-img-cropper", []).directive("imageCropper", ["$document", "$window", "imageCropperDataShare", function (a, b, c) {
    return {
        scope: {
            image: "=",
            croppedImage: "=",
            cropWidth: "=",
            cropHeight: "=",
            keepAspect: "=",
            touchRadius: "=",
            cropAreaBounds: "=",
            minWidth: "=",
            minHeight: "="
        },
        restrict: "A",
        link: function (a, b) {
            var d, e = e || function (a, b) {
                function c() {
                    this.constructor = a
                }
                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                c.prototype = b.prototype, a.prototype = new c
            },
                f = function () {
                    function a(a, b, c) {
                        this.over = !1, this.drag = !1, this.position = new l(a, b), this.offset = new l(0, 0), this.radius = c
                    }
                    return a.prototype.setDrag = function (a) {
                        this.drag = a, this.setOver(a)
                    }, a.prototype.draw = function () { }, a.prototype.setOver = function (a) {
                        this.over = a
                    }, a.prototype.touchInBounds = function (a, b) {
                        return a > this.position.x - this.radius && a < this.position.x + this.radius && b > this.position.y - this.radius && b < this.position.y + this.radius
                    }, a.prototype.getPosition = function () {
                        return this.position
                    }, a.prototype.setPosition = function (a, b) {
                        this.position.x = a, this.position.y = b
                    }, a
                }(),
                g = function () {
                    function a(b) {
                        this.borrowed = 0, a.instance = this;
                        for (var c = null, d = 0; b > d; d++)
                            if (0 === d) this.firstAvailable = new l, c = this.firstAvailable;
                            else {
                                var e = new l;
                                c.setNext(e), c = e
                            }
                    }
                    return a.prototype.borrow = function (a, b) {
                        if (null == this.firstAvailable) throw "Pool exhausted";
                        this.borrowed++;
                        var c = this.firstAvailable;
                        return this.firstAvailable = c.getNext(), c.x = a, c.y = b, c
                    }, a.prototype.returnPoint = function (a) {
                        this.borrowed-- , a.x = 0, a.y = 0, a.setNext(this.firstAvailable), this.firstAvailable = a
                    }, a
                }(),
                h = function () {
                    function a() { }
                    return a.init = function (a) {
                        this.canvas = a, this.ctx = this.canvas.getContext("2d")
                    }, a.DEG2RAD = .0174532925, a
                }(),
                i = function (a) {
                    function b(b, c, d) {
                        a.call(this, b, c, d), this.iconPoints = new Array, this.scaledIconPoints = new Array, this.getDragIconPoints(this.iconPoints, 1), this.getDragIconPoints(this.scaledIconPoints, 1.2)
                    }
                    return e(b, a), b.prototype.draw = function (a) {
                        this.over || this.drag ? this.drawIcon(a, this.scaledIconPoints) : this.drawIcon(a, this.iconPoints)
                    }, b.prototype.getDragIconPoints = function (a, b) {
                        var c = 17 * b,
                            d = 14 * b,
                            e = 8 * b,
                            f = 4 * b;
                        a.push(g.instance.borrow(-f / 2, c - e)), a.push(g.instance.borrow(-d / 2, c - e)), a.push(g.instance.borrow(0, c)), a.push(g.instance.borrow(d / 2, c - e)), a.push(g.instance.borrow(f / 2, c - e)), a.push(g.instance.borrow(f / 2, f / 2)), a.push(g.instance.borrow(c - e, f / 2)), a.push(g.instance.borrow(c - e, d / 2)), a.push(g.instance.borrow(c, 0)), a.push(g.instance.borrow(c - e, -d / 2)), a.push(g.instance.borrow(c - e, -f / 2)), a.push(g.instance.borrow(f / 2, -f / 2)), a.push(g.instance.borrow(f / 2, -c + e)), a.push(g.instance.borrow(d / 2, -c + e)), a.push(g.instance.borrow(0, -c)), a.push(g.instance.borrow(-d / 2, -c + e)), a.push(g.instance.borrow(-f / 2, -c + e)), a.push(g.instance.borrow(-f / 2, -f / 2)), a.push(g.instance.borrow(-c + e, -f / 2)), a.push(g.instance.borrow(-c + e, -d / 2)), a.push(g.instance.borrow(-c, 0)), a.push(g.instance.borrow(-c + e, d / 2)), a.push(g.instance.borrow(-c + e, f / 2)), a.push(g.instance.borrow(-f / 2, f / 2))
                    }, b.prototype.drawIcon = function (a, b) {
                        a.beginPath(), a.moveTo(b[0].x + this.position.x, b[0].y + this.position.y);
                        for (var c = 0; c < b.length; c++) {
                            var d = b[c];
                            a.lineTo(d.x + this.position.x, d.y + this.position.y)
                        }
                        a.closePath(), a.fillStyle = "#5f447b", a.fill()
                    }, b.prototype.recalculatePosition = function (a) {
                        var b = a.getCentre();
                        this.setPosition(b.x, b.y), g.instance.returnPoint(b)
                    }, b
                }(f),
                j = function (a) {
                    function b(b, c, d) {
                        a.call(this, b, c, d)
                    }
                    return e(b, a), b.prototype.drawCornerBorder = function (a) {
                        var b = 10;
                        (this.over || this.drag) && (b = 12);
                        var c = 1,
                            d = 1;

                    }, b.prototype.drawCornerFill = function (a) {
                        var b = 10;
                        (this.over || this.drag) && (b = 12);
                        var c = 1,
                            d = 1;

                    }, b.prototype.moveX = function (a) {
                        this.setPosition(a, this.position.y)
                    }, b.prototype.moveY = function (a) {
                        this.setPosition(this.position.x, a)
                    }, b.prototype.move = function (a, b) {
                        this.setPosition(a, b), this.verticalNeighbour.moveX(a), this.horizontalNeighbour.moveY(b)
                    }, b.prototype.addHorizontalNeighbour = function (a) {
                        this.horizontalNeighbour = a
                    }, b.prototype.addVerticalNeighbour = function (a) {
                        this.verticalNeighbour = a
                    }, b.prototype.getHorizontalNeighbour = function () {
                        return this.horizontalNeighbour
                    }, b.prototype.getVerticalNeighbour = function () {
                        return this.verticalNeighbour
                    }, b.prototype.draw = function (a) {
                        this.drawCornerFill(a), this.drawCornerBorder(a)
                    }, b
                }(f),
                k = function () {
                    function a(a, b, c, d) {
                        void 0 === a && (a = 0), void 0 === b && (b = 0), void 0 === c && (c = 0), void 0 === d && (d = 0), this.left = a, this.right = a + c, this.top = b, this.bottom = b + d
                    }
                    return a.prototype.getWidth = function () {
                        return this.right - this.left
                    }, a.prototype.getHeight = function () {
                        return this.bottom - this.top
                    }, a.prototype.getCentre = function () {
                        var a = this.getWidth(),
                            b = this.getHeight();
                        return g.instance.borrow(this.left + a / 2, this.top + b / 2)
                    }, a
                }(),
                l = function () {
                    function a(a, b) {
                        void 0 === a && (a = 0), void 0 === b && (b = 0), this.x = a, this.y = b
                    }
                    return a.prototype.setNext = function (a) {
                        this.next = a
                    }, a.prototype.getNext = function () {
                        return this.next
                    }, a
                }(),
                m = function () {
                    function a(a, b, c) {
                        void 0 === a && (a = 0), void 0 === b && (b = 0), void 0 === c && (c = 0), this.id = 0, this.x = a, this.y = b, this.id = c
                    }
                    return a
                }(),
                n = function () {
                    function b(a, b, c, d, e, f, k) {
                        void 0 === b && (b = 0), void 0 === c && (c = 0), void 0 === d && (d = 100), void 0 === e && (e = 50), void 0 === f && (f = !0), void 0 === k && (k = 20), this.keepAspect = !1, this.aspectRatio = 0, this.currentDragTouches = new Array, this.isMouseDown = !1, this.ratioW = 1, this.ratioH = 1, this.fileType = "png", this.imageSet = !1, this.pointPool = new g(200), h.init(a), this.buffer = document.createElement("canvas"), this.cropCanvas = document.createElement("canvas"), this.buffer.width = a.width, this.buffer.height = a.height, this.tl = new j(b, c, k), this.tr = new j(b + d, c, k), this.bl = new j(b, c + e, k), this.br = new j(b + d, c + e, k), this.tl.addHorizontalNeighbour(this.tr), this.tl.addVerticalNeighbour(this.bl), this.tr.addHorizontalNeighbour(this.tl), this.tr.addVerticalNeighbour(this.br), this.bl.addHorizontalNeighbour(this.br), this.bl.addVerticalNeighbour(this.tl), this.br.addHorizontalNeighbour(this.bl), this.br.addVerticalNeighbour(this.tr), this.markers = [this.tl, this.tr, this.bl, this.br], this.center = new i(b + d / 2, c + e / 2, k), this.canvas = a, this.ctx = this.canvas.getContext("2d"), this.keepAspect = f, this.aspectRatio = e / d, this.draw(this.ctx), this.croppedImage = new Image, this.currentlyInteracting = !1, window.addEventListener("mousemove", this.onMouseMove.bind(this)), window.addEventListener("mouseup", this.onMouseUp.bind(this)), a.addEventListener("mousedown", this.onMouseDown.bind(this)), window.addEventListener("touchmove", this.onTouchMove.bind(this), !1), a.addEventListener("touchstart", this.onTouchStart.bind(this), !1), window.addEventListener("touchend", this.onTouchEnd.bind(this), !1)
                    }
                    return b.prototype.resizeCanvas = function (a, b) {
                        this.canvas.width = a, this.canvas.height = b, this.buffer.width = a, this.buffer.height = b, this.draw(this.ctx)
                    }, b.prototype.draw = function (a) {
                        var b = this.getBounds();
                        if (this.srcImage) {
                            a.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                            var c = this.srcImage.height / this.srcImage.width,
                                d = this.canvasHeight / this.canvasWidth,
                                e = this.canvasWidth,
                                f = this.canvasHeight;
                            d > c ? (e = this.canvasWidth, f = this.canvasWidth * c) : (f = this.canvasHeight, e = this.canvasHeight / c), this.ratioW = e / this.srcImage.width, this.ratioH = f / this.srcImage.height, c > d ? this.drawImageIOSFix(a, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, this.buffer.width / 2 - e / 2, 0, e, f) : this.drawImageIOSFix(a, this.srcImage, 0, 0, this.srcImage.width, this.srcImage.height, 0, this.buffer.height / 2 - f / 2, e, f), this.buffer.getContext("2d").drawImage(this.canvas, 0, 0, this.canvasWidth, this.canvasHeight), a.fillStyle = "rgba(0, 0, 0, 0.7)", a.fillRect(0, 0, this.canvasWidth, this.canvasHeight), a.drawImage(this.buffer, b.left, b.top, Math.max(b.getWidth(), 1), Math.max(b.getHeight(), 1), b.left, b.top, b.getWidth(), b.getHeight());
                            for (var g, h = 0; h < this.markers.length; h++) g = this.markers[h], g.draw(a);
                            this.center.draw(a), a.lineWidth = 2, a.strokeStyle = "#67b7b4", a.strokeRect(b.left, b.top, b.getWidth(), b.getHeight())
                        } else a.fillStyle = "rgba(192,192,192,1)", a.fillRect(0, 0, this.canvas.width, this.canvas.height)
                    }, b.prototype.dragCrop = function (b, c, d) {
                        var e = this.getBounds(),
                            f = b - e.getWidth() / 2,
                            g = b + e.getWidth() / 2,
                            h = c - e.getHeight() / 2,
                            i = c + e.getHeight() / 2;
                        g >= this.maxXClamp && (b = this.maxXClamp - e.getWidth() / 2), f <= this.minXClamp && (b = e.getWidth() / 2 + this.minXClamp), h < this.minYClamp && (c = e.getHeight() / 2 + this.minYClamp), i >= this.maxYClamp && (c = this.maxYClamp - e.getHeight() / 2), this.tl.moveX(b - e.getWidth() / 2), this.tl.moveY(c - e.getHeight() / 2), this.tr.moveX(b + e.getWidth() / 2), this.tr.moveY(c - e.getHeight() / 2), this.bl.moveX(b - e.getWidth() / 2), this.bl.moveY(c + e.getHeight() / 2), this.br.moveX(b + e.getWidth() / 2), this.br.moveY(c + e.getHeight() / 2), d.setPosition(b, c), a.cropAreaBounds && this.imageSet && (a.cropAreaBounds = this.getCropBounds(), a.$apply())
                    }, b.prototype.enforceMinSize = function (b, c, d) {
                        var e = b - d.getHorizontalNeighbour().getPosition().x,
                            f = c - d.getVerticalNeighbour().getPosition().y,
                            h = a.minWidth - Math.abs(e),
                            i = a.minHeight - Math.abs(f);
                        return 0 == e || 0 == f ? (b = d.getPosition().x, c = d.getPosition().y, g.instance.borrow(b, c)) : (a.keepAspect ? h > 0 && i / this.aspectRatio > 0 ? h > i / this.aspectRatio ? 0 > e ? (b -= h, 0 > f ? c -= h * this.aspectRatio : c += h * this.aspectRatio) : (b += h, 0 > f ? c -= h * this.aspectRatio : c += h * this.aspectRatio) : 0 > f ? (c -= i, 0 > e ? b -= i / this.aspectRatio : b += i / this.aspectRatio) : (c += i, 0 > e ? b -= i / this.aspectRatio : b += i / this.aspectRatio) : h > 0 ? 0 > e ? (b -= h, 0 > f ? c -= h * this.aspectRatio : c += h * this.aspectRatio) : (b += h, 0 > f ? c -= h * this.aspectRatio : c += h * this.aspectRatio) : i > 0 && (0 > f ? (c -= i, 0 > e ? b -= i / this.aspectRatio : b += i / this.aspectRatio) : (c += i, 0 > e ? b -= i / this.aspectRatio : b += i / this.aspectRatio)) : (h > 0 && (0 > e ? b -= h : b += h), i > 0 && (0 > f ? c -= i : c += i)), (b < this.minXClamp || b > this.maxXClamp || c < this.minYClamp || c > this.maxYClamp) && (b = d.getPosition().x, c = d.getPosition().y), g.instance.borrow(b, c))
                    }, b.prototype.dragCorner = function (b, c, d) {
                        var e, f = 0,
                            h = 0,
                            i = 0,
                            j = 0,
                            k = 0,
                            l = 0,
                            m = 0,
                            n = 0,
                            o = 0;
                        this.center.recalculatePosition(this.getBounds()), a.cropAreaBounds && this.imageSet && (a.cropAreaBounds = this.getCropBounds(), a.$apply())
                    }, b.prototype.getSide = function (a, b, c) {
                        var d = this.sign((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x));
                        return g.instance.returnPoint(a), g.instance.returnPoint(c), d
                    }, b.prototype.sign = function (a) {
                        return +a === a ? 0 === a ? a : a > 0 ? 1 : -1 : 0 / 0
                    }, b.prototype.handleRelease = function (a) {
                        if (null != a) {
                            for (var b = 0, c = 0; c < this.currentDragTouches.length; c++) a.id == this.currentDragTouches[c].id && (this.currentDragTouches[c].dragHandle.setDrag(!1), a.dragHandle = null, b = c);
                            this.currentDragTouches.splice(b, 1), this.draw(this.ctx)
                        }
                    }, b.prototype.handleMove = function (a) {
                        for (var b = !1, d = 0; d < this.currentDragTouches.length; d++)
                            if (a.id == this.currentDragTouches[d].id && null != this.currentDragTouches[d].dragHandle) {
                                var e = this.currentDragTouches[d],
                                    f = this.clampPosition(a.x - e.dragHandle.offset.x, a.y - e.dragHandle.offset.y);
                                a.x = f.x, a.y = f.y, g.instance.returnPoint(f), e.dragHandle instanceof j ? this.dragCorner(a.x, a.y, e.dragHandle) : this.dragCrop(a.x, a.y, e.dragHandle), this.currentlyInteracting = !0, b = !0, c.setPressed(this.canvas);
                                break
                            }
                        if (!b) {
                            for (var h = 0; h < this.markers.length; h++) {
                                var i = this.markers[h];
                                if (i.touchInBounds(a.x, a.y)) {
                                    a.dragHandle = i, this.currentDragTouches.push(a), i.setDrag(!0), a.dragHandle.offset.x = a.x - a.dragHandle.getPosition().x, a.dragHandle.offset.y = a.y - a.dragHandle.getPosition().y, this.dragCorner(a.x - a.dragHandle.offset.x, a.y - a.dragHandle.offset.y, a.dragHandle);
                                    break
                                }
                            }
                            null == a.dragHandle && this.center.touchInBounds(a.x, a.y) && (a.dragHandle = this.center, this.currentDragTouches.push(a), a.dragHandle.setDrag(!0), a.dragHandle.offset.x = a.x - a.dragHandle.getPosition().x, a.dragHandle.offset.y = a.y - a.dragHandle.getPosition().y, this.dragCrop(a.x - a.dragHandle.offset.x, a.y - a.dragHandle.offset.y, a.dragHandle))
                        }
                    }, b.prototype.updateClampBounds = function () {
                        var a = this.srcImage.height / this.srcImage.width,
                            b = this.canvas.height / this.canvas.width,
                            c = this.canvas.width,
                            d = this.canvas.height;
                        b > a ? (c = this.canvas.width, d = this.canvas.width * a) : (d = this.canvas.height, c = this.canvas.height / a), this.minXClamp = this.canvas.width / 2 - c / 2, this.minYClamp = this.canvas.height / 2 - d / 2, this.maxXClamp = this.canvas.width / 2 + c / 2, this.maxYClamp = this.canvas.height / 2 + d / 2
                    }, b.prototype.getCropBounds = function () {
                        var a = this.canvas.height - 2 * this.minYClamp,
                            b = this.getBounds();
                        return b.top = Math.round((a - b.top + this.minYClamp) / this.ratioH), b.bottom = Math.round((a - b.bottom + this.minYClamp) / this.ratioH), b.left = Math.round((b.left - this.minXClamp) / this.ratioW), b.right = Math.round((b.right - this.minXClamp) / this.ratioW), b
                    }, b.prototype.clampPosition = function (a, b) {
                        return a < this.minXClamp && (a = this.minXClamp), a > this.maxXClamp && (a = this.maxXClamp), b < this.minYClamp && (b = this.minYClamp), b > this.maxYClamp && (b = this.maxYClamp), g.instance.borrow(a, b)
                    }, b.prototype.isImageSet = function () {
                        return this.imageSet
                    }, b.prototype.setImage = function (b) {
                        if (!b) throw "Image is null";
                        this.imageSet = !0, this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        var c = this.buffer.getContext("2d");
                        c.clearRect(0, 0, this.buffer.width, this.buffer.height);
                        var d = b.src.split("."),
                            e = d[1];
                        ("png" == e || "jpg" == e) && (this.fileType = e), this.srcImage = b, this.updateClampBounds();
                        var f = this.srcImage.height / this.srcImage.width,
                            h = this.getBounds(),
                            i = h.getHeight() / h.getWidth(),
                            j = this.canvas.width,
                            k = this.canvas.height;
                        this.canvasWidth = j, this.canvasHeight = k;
                        var l = this.canvas.width / 2,
                            m = this.canvas.height / 2,
                            n = g.instance.borrow(l - h.getWidth() / 2, m + h.getHeight() / 2),
                            o = g.instance.borrow(l + h.getWidth() / 2, m + h.getHeight() / 2),
                            p = g.instance.borrow(l - h.getWidth() / 2, m - h.getHeight() / 2),
                            q = g.instance.borrow(l + h.getWidth() / 2, m - h.getHeight() / 2);
                        if (this.tl.setPosition(n.x, n.y), this.tr.setPosition(o.x, o.y), this.bl.setPosition(p.x, p.y), this.br.setPosition(q.x, q.y), g.instance.returnPoint(n), g.instance.returnPoint(o), g.instance.returnPoint(p), g.instance.returnPoint(q), this.center.setPosition(l, m), i > f) {
                            var r = Math.min(j * f, k),
                                s = r / i;
                            n = g.instance.borrow(l - s / 2, m + r / 2), o = g.instance.borrow(l + s / 2, m + r / 2), p = g.instance.borrow(l - s / 2, m - r / 2), q = g.instance.borrow(l + s / 2, m - r / 2), this.tl.setPosition(n.x, n.y), this.tr.setPosition(o.x, o.y), this.bl.setPosition(p.x, p.y), this.br.setPosition(q.x, q.y), g.instance.returnPoint(n), g.instance.returnPoint(o), g.instance.returnPoint(p), g.instance.returnPoint(q)
                        } else if (f > i) {
                            var t = Math.min(k / f, j),
                                u = t * i;
                            n = g.instance.borrow(l - t / 2, m + u / 2), o = g.instance.borrow(l + t / 2, m + u / 2), p = g.instance.borrow(l - t / 2, m - u / 2), q = g.instance.borrow(l + t / 2, m - u / 2), this.tl.setPosition(n.x, n.y), this.tr.setPosition(o.x, o.y), this.bl.setPosition(p.x, p.y), this.br.setPosition(q.x, q.y), g.instance.returnPoint(n), g.instance.returnPoint(o), g.instance.returnPoint(p), g.instance.returnPoint(q)
                        }
                        this.vertSquashRatio = this.detectVerticalSquash(b), this.draw(this.ctx);
                        var v = this.getCroppedImage(a.cropWidth, a.cropHeight);
                        a.croppedImage = v.src, a.cropAreaBounds && this.imageSet && (a.cropAreaBounds = this.getCropBounds(), a.$apply())
                    }, b.prototype.getCroppedImage = function (a, b) {
                        var c = this.getBounds();
                        if (!this.srcImage) throw "Source image not set.";
                        if (a && b) {
                            var d = this.srcImage.height / this.srcImage.width,
                                e = this.canvas.height / this.canvas.width,
                                f = this.canvas.width,
                                g = this.canvas.height;
                            e > d ? (f = this.canvas.width, g = this.canvas.width * d) : d > e ? (g = this.canvas.height, f = this.canvas.height / d) : (g = this.canvas.height, f = this.canvas.width), this.ratioW = f / this.srcImage.width, this.ratioH = g / this.srcImage.height, this.cropCanvas.width = a, this.cropCanvas.height = b;
                            var h = (this.buffer.height - g) / 2 / this.ratioH,
                                i = (this.buffer.width - f) / 2 / this.ratioW;
                            this.drawImageIOSFix(this.cropCanvas.getContext("2d"), this.srcImage, Math.max(Math.round(c.left / this.ratioW - i), 0), Math.max(Math.round(c.top / this.ratioH - h), 0), Math.max(Math.round(c.getWidth() / this.ratioW), 1), Math.max(Math.round(c.getHeight() / this.ratioH), 1), 0, 0, a, b), this.croppedImage.width = a, this.croppedImage.height = b
                        } else this.cropCanvas.width = Math.max(c.getWidth(), 1), this.cropCanvas.height = Math.max(c.getHeight(), 1), this.cropCanvas.getContext("2d").drawImage(this.buffer, c.left, c.top, Math.max(c.getWidth(), 1), Math.max(c.getHeight(), 1), 0, 0, c.getWidth(), c.getHeight()), this.croppedImage.width = this.cropCanvas.width, this.croppedImage.height = this.cropCanvas.height;
                        return this.croppedImage.src = this.cropCanvas.toDataURL("image/" + this.fileType), this.croppedImage
                    }, b.prototype.getBounds = function () {
                        for (var a = Number.MAX_VALUE, b = Number.MAX_VALUE, c = -Number.MAX_VALUE, d = -Number.MAX_VALUE, e = 0; e < this.markers.length; e++) {
                            var f = this.markers[e];
                            f.getPosition().x < a && (a = f.getPosition().x), f.getPosition().x > c && (c = f.getPosition().x), f.getPosition().y < b && (b = f.getPosition().y), f.getPosition().y > d && (d = f.getPosition().y)
                        }
                        var g = new k;
                        return g.left = a, g.right = c, g.top = b, g.bottom = d, g
                    }, b.prototype.setBounds = function (a) {
                        for (var b, c, d, e, f = this.getBounds(), g = 0; g < this.markers.length; g++) {
                            var h = this.markers[g];
                            h.getPosition().x == f.left ? h.getPosition().y == f.top ? b = h : d = h : h.getPosition().y == f.top ? c = h : e = h
                        }
                        b.setPosition(a.left, a.top), c.setPosition(a.right, a.top), d.setPosition(a.left, a.bottom), e.setPosition(a.right, a.bottom), this.center.recalculatePosition(a), this.center.draw(this.ctx)
                    }, b.prototype.getMousePos = function (a, b) {
                        var c = a.getBoundingClientRect();
                        return g.instance.borrow(b.clientX - c.left, b.clientY - c.top)
                    }, b.prototype.getTouchPos = function (a, b) {
                        var c = a.getBoundingClientRect();
                        return g.instance.borrow(b.clientX - c.left, b.clientY - c.top)
                    }, b.prototype.onTouchMove = function (a) {
                        if (d.isImageSet()) {
                            if (a.preventDefault(), a.touches.length >= 1)
                                for (var b = 0; b < a.touches.length; b++) {
                                    var c = a.touches[b],
                                        e = this.getTouchPos(this.canvas, c),
                                        f = new m(e.x, e.y, c.identifier);
                                    g.instance.returnPoint(e), this.move(f, a)
                                }
                            this.draw(this.ctx)
                        }
                    }, b.prototype.onMouseMove = function (a) {
                        if (d.isImageSet()) {
                            var b = this.getMousePos(this.canvas, a);
                            this.move(new m(b.x, b.y, 0), a);
                            var c = this.getDragTouchForID(0);
                            c ? (c.x = b.x, c.y = b.y) : c = new m(b.x, b.y, 0), g.instance.returnPoint(b), this.drawCursors(c, a), this.draw(this.ctx)
                        }
                    }, b.prototype.move = function (a) {
                        this.isMouseDown && this.handleMove(a)
                    }, b.prototype.getDragTouchForID = function (a) {
                        for (var b = 0; b < this.currentDragTouches.length; b++)
                            if (a == this.currentDragTouches[b].id) return this.currentDragTouches[b]
                    }, b.prototype.drawCursors = function (a, b) {
                        var d = !1;
                        null != a && (a.dragHandle == this.center && (c.setStyle(this.canvas, "move"), d = !0), null != a.dragHandle && a.dragHandle instanceof j && (this.drawCornerCursor(a.dragHandle, a.dragHandle.getPosition().x, a.dragHandle.getPosition().y, b), d = !0));
                        var e = !1;
                        if (!d) {
                            for (var f = 0; f < this.markers.length; f++) e = e || this.drawCornerCursor(this.markers[f], a.x, a.y, b);
                            e || c.setStyle(this.canvas, "initial")
                        }
                        e || d || !this.center.touchInBounds(a.x, a.y) ? this.center.setOver(!1) : (this.center.setOver(!0), c.setOver(this.canvas), c.setStyle(this.canvas, "move"))
                    }, b.prototype.drawCornerCursor = function (a, b, d) {
                        return a.touchInBounds(b, d) ? (a.setOver(!0), a.getHorizontalNeighbour().getPosition().x > a.getPosition().x ? a.getVerticalNeighbour().getPosition().y > a.getPosition().y ? (c.setOver(this.canvas), c.setStyle(this.canvas, "nwse-resize")) : (c.setOver(this.canvas), c.setStyle(this.canvas, "nesw-resize")) : a.getVerticalNeighbour().getPosition().y > a.getPosition().y ? (c.setOver(this.canvas), c.setStyle(this.canvas, "nesw-resize")) : (c.setOver(this.canvas), c.setStyle(this.canvas, "nwse-resize")), !0) : (a.setOver(!1), !1)
                    }, b.prototype.onTouchStart = function () {
                        d.isImageSet() && (this.isMouseDown = !0)
                    }, b.prototype.onTouchEnd = function (b) {
                        if (d.isImageSet()) {
                            for (var c = 0; c < b.changedTouches.length; c++) {
                                var e = b.changedTouches[c],
                                    f = this.getDragTouchForID(e.identifier);
                                null != f && ((f.dragHandle instanceof j || f.dragHandle instanceof i) && f.dragHandle.setOver(!1), this.handleRelease(f))
                            }
                            if (d.isImageSet() && this.currentlyInteracting) {
                                var g = this.getCroppedImage(a.cropWidth, a.cropHeight);
                                a.croppedImage = g.src, a.$apply()
                            }
                            0 == this.currentDragTouches.length && (this.isMouseDown = !1, this.currentlyInteracting = !1)
                        }
                    }, b.prototype.drawImageIOSFix = function (a, b, c, d, e, f, g, h, i, j) {
                        a.drawImage(b, c * this.vertSquashRatio, d * this.vertSquashRatio, e * this.vertSquashRatio, f * this.vertSquashRatio, g, h, i, j)
                    }, b.prototype.detectVerticalSquash = function (a) {
                        var b = (a.naturalWidth, a.naturalHeight),
                            c = document.createElement("canvas");
                        c.width = 1, c.height = b;
                        var d = c.getContext("2d");
                        d.drawImage(a, 0, 0);
                        for (var e = d.getImageData(0, 0, 1, b).data, f = 0, g = b, h = b; h > f;) {
                            var i = e[4 * (h - 1) + 3];
                            0 === i ? g = h : f = h, h = g + f >> 1
                        }
                        var j = h / b;
                        return 0 === j ? 1 : j
                    }, b.prototype.onMouseDown = function () {
                        d.isImageSet() && (this.isMouseDown = !0)
                    }, b.prototype.onMouseUp = function () {
                        if (d.isImageSet()) {
                            if (c.setReleased(this.canvas), this.isMouseDown = !1, this.handleRelease(new m(0, 0, 0)), 1 == this.currentlyInteracting) {
                                var b = this.getCroppedImage(a.cropWidth, a.cropHeight);
                                a.croppedImage = b.src, a.$apply()
                            }
                            this.currentlyInteracting = !1
                        }
                    }, b
                }();
            angular.element(document).ready(function () {
                var c = angular.element(b[0]),
                    e = c[0],
                    f = a.cropWidth,
                    g = a.cropHeight,
                    h = a.keepAspect,
                    i = a.touchRadius;
                d = new n(e, e.width / 2 - f / 2, e.height / 2 - g / 2, f, g, h, i)
            }), a.$watch("image", function (b) {
                if (null != b) {
                    var c = new Image;
                    c.addEventListener("load", function () {
                        d.setImage(c);
                        var b = d.getCroppedImage(a.cropWidth, a.cropHeight);
                        a.croppedImage = b.src, a.$apply()
                    }, !1), c.src = b
                }
            })
        }
    }
}]), angular.module("angular-img-cropper").directive("imgCropperFileread", ["$timeout", function (a) {

    return {
        scope: {
            image: "="
        },
        link: function (b, c) {
            c.bind("change", function (c) {
                var d = new FileReader;
                d.onload = function (c) {
                    var t = c.target.result.split(';');
                    t = t[0].replace('data:', '');
                    if ((t == 'image/png') || (t == 'image/jpeg') || (t == 'image/jpg')) {
                        a(function () {
                            b.image = c.target.result
                        }, 0)
                        $('#croppImage').modal({ backdrop: 'static', keyboard: false, show: true });
                    } else {
                        toastr.info("Formato inválido de arquivo!");
                        return true;
                    }
                }, c.target.files[0] && d.readAsDataURL(c.target.files[0])
            })
        },
    }
}]), angular.module("angular-img-cropper").directive("imgCropperFilereadCall", function () {
    return {
        scope: {
            control: "="
        },
        link: function (a) {
            a.internalControl = a.control || {}, a.internalControl.load = function (a) {
                var b = angular.element(document.querySelector(a)),
                    c = document.createEvent("MouseEvent");
                c.initEvent("click", !0, !1), b[0].dispatchEvent(c)
            }
        }
    }
}), angular.module("angular-img-cropper").factory("imageCropperDataShare", function () {
    var a, b, c = {};
    return c.setPressed = function (b) {
        a = b
    }, c.setReleased = function (b) {
        b === a && (a = void 0)
    }, c.setOver = function (a) {
        b = a
    }, c.setStyle = function (c, d) {
        void 0 !== a ? a === c && angular.element(document.documentElement).css("cursor", d) : c === b && angular.element(document.documentElement).css("cursor", d)
    }, c
});