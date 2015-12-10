function Marquee() {
    var b = this;
    var a = arguments;
    b.$ = function (c) {
        return document.getElementById(c)
    };
    b.CopyRight = (b.F = ["MSClass 2.65.110518", "Class Of Marquee Scroll", "通用不间断滚动JS封装类", "http://www.popub.net/script/MSClass.html", "程序/版权 崔永祥(333) zhadan007@21cn.com"]).join("\n");
    b.A = a[0]["MSClass"] || a[0] || a[0][0];
    b.ID = typeof b.A == "object" ? b.$(b.A[0]) || b.$(b.A.MSClassID) : b.$(b.A);
    if (!b.ID) {
        return alert("您要设置的[" + (b.A.MSClassID || b.A[0] || b.A) + "]初始化错误\n请检查标签ID设置是否正确!") || (b.ID = -1)
    }
    b.BakStep = 1 + (b.Bound = -1);
    b.Hide = b.m = b.p = b.q = b.r = b.s = b.B = b.u = b.k = b.e = b.a = b.b = b.c = b.d = b.f = b.g = b.h = b.i = b.j = b.o = 0;
    b.n = {
        altertop: -1,
        alterup: -1,
        top: 0,
        up: 0,
        bottom: 1,
        down: 1,
        left: 2,
        right: 3,
        alterleft: 4
    };
    b.Direction = a[1] || a[0]["Direction"] || 0;
    b.Step = a[2] || a[0]["Step"] || 1;
    b.Width = a[3] || a[0]["Width"] || 0;
    b.Height = a[4] || a[0]["Height"] || 0;
    b.Timer = a[5] || a[0]["Timer"] || 30;
    b.DelayTime = a[6] || a[0]["DelayTime"] || 0;
    b.WaitTime = a[7] || a[0]["WaitTime"] || 800;
    b.ScrollStep = a[8] || a[0]["ScrollStep"] || -10;
    b.SwitchType = a[9] || a[0]["SwitchType"] || 0;
    b.HiddenID = a[10] || a[0]["HiddenID"];
    b.PrevBtn = b.$(a[0]["PrevBtnID"]) || 0;
    b.NextBtn = b.$(a[0]["NextBtnID"]) || 0;
    b.ID.style.overflow = b.ID.style.overflowX = b.ID.style.overflowY = "hidden";
    b.IsNotOpera = (navigator.userAgent.toLowerCase().indexOf("opera") == -1);
    b.IsIE = (document.all) ? 1 : 0;
    if (a.length >= 7 || a[0]["AutoStart"] == 1) {
        b.Start()
    }
}
Marquee.prototype.Start = function () {
    if (this.ID == -1) {
        return
    }
    var n = this,
        b, c, f, k, s;
    var q = "active";
    var e = Marquee;
    var a = function (u, t, m) {
            m ? 0 : m = 0;
            return n.IsIE ? (u.currentStyle[t] != "auto" && u.currentStyle[t] != "medium" && u.currentStyle[t] != "0px" && u.currentStyle[t] != "30pt" && u.currentStyle[t] != "1em" && u.currentStyle[t] != "static") ? u.currentStyle[t] : m : (window.getComputedStyle(u, null)[t] != "auto" && window.getComputedStyle(u, null)[t] != "medium" && window.getComputedStyle(u, null)[t] != "0px" && window.getComputedStyle(u, null)[t] != "12px" && window.getComputedStyle(u, null)[t] != "static") ? window.getComputedStyle(u, null)[t] : m
        };
    n.ID.style.position = a(n.ID, "position", "relative");
    var j = function () {
            var m = document.createElement("DIV");
            m.id = "M" + (Math.random().toString().slice(-6));
            //m.style.cssText = "display:none;z-index:100;position:absolute;left:0;top:-10000px;width:165px;border-left:1px solid #D4D0C8;border-top:1px solid #D4D0C8;border-right:1px solid #404040;border-bottom:1px solid #404040;";
            //m.innerHTML = '<div style="font-family:\u5B8B\u4F53;cursor:default;background-color:#D4D0C8;width:163px;border-left:1px solid #FFF;border-top:1px solid #FFF;border-right:1px solid #808080;border-bottom:1px solid #808080;"><table border="0" cellpadding="0" style="font-size:12px;text-indent:10px;margin:1px;width:161px;text-align:left;-moz-user-select:none; border-collapse:collapse" onselectstart="return false;" oncontextmenu="return false"><tr><td height="17"  onmouseover="this.style.backgroundColor=\'#0A246A\';this.style.color=\'#FFF\';document.getElementById(\'' + m.id + "_1').style.display='none';\" onmouseout=\"this.style.backgroundColor='';this.style.color='#000';document.getElementById('" + m.id + "_1').style.display='';\" ><div id=\"" + m.id + '_1" style="position:absolute;left:1px;top:5px;color:#FFF;z-index:0;font-size:12px;">' + n.F[1] + '</div><div style="position:absolute;left:0px;top:4px;color:#808080;-moz-user-select:none;font-size:12px;">' + n.F[1] + '</div></td></tr><tr><td height="8"><div style="border-top:1px solid #808080;border-bottom:1px solid #FFF;"></div></td></tr><tr><td height="17" onmouseover="this.style.backgroundColor=\'#0A246A\';this.style.color=\'#FFF\';" onmouseout="this.style.backgroundColor=\'\';this.style.color=\'#000\';" onmousedown="window.open(\'' + n.F[3] + "','_blank')\">Help or Update …</td></tr><tr><td height=\"17\" onmouseover=\"this.style.backgroundColor='#0A246A';this.style.color='#FFF';\" onmouseout=\"this.style.backgroundColor='';this.style.color='#000';\" onmousedown=\"alert('" + n.F.join("\\n") + "')\">About " + n.F[0] + "</td></tr></table></div>";
            document.body.appendChild(m);
            e.ID = m.id
        };
    var d = function (t) {
            var u = n.$(e.ID);
            if (!u) {
                return false
            }
            var m = t || window.event;
            u.style.top = (m.clientY + (document.documentElement.scrollTop || document.body.scrollTop)) + "px";
            u.style.left = document.body.clientWidth - m.clientX <= 165 ? (m.clientX - 165) + "px" : m.clientX + "px";
            u.style.display = "";
            return false
        };
    var p = function () {
            var m = n.$(e.ID);
            if (!m) {
                return false
            }
            m.style.display = "none"
        };
    n.ID.oncontextmenu = function () {
            return false
        };
    if (!e.ID) {
            e.ID = 1;
            n.IsIE ? window.attachEvent("onload", j) : window.onload = function () {
                j()
            }
        }
    if (n.IsIE) {
            n.ID.attachEvent("oncontextmenu", d);
            document.attachEvent("onclick", p)
        } else {
            n.ID.addEventListener("contextmenu", d, true);
            document.addEventListener("click", p, true)
        }
    if (n.Timer < 20) {
            n.Timer = 20
        }
    if (n.WaitTime < 800) {
            n.WaitTime = 800
        }
    if (n.Width == 0) {
            n.Width = parseInt(n.ID.style.width)
        }
    if (n.Height == 0) {
            n.Height = parseInt(n.ID.style.height)
        }
    n.ID.style.width = n.Width + "px";
    n.ID.style.height = n.Height + "px";
    if (typeof n.Direction == "string") {
            n.Direction = n.n[n.Direction.toString().toLowerCase()]
        }
    b = n.Direction > 1 ? "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;display:inline;'><tr><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td><td noWrap=true style='white-space: nowrap;word-break:keep-all;'>MSCLASS_TEMP_HTML</td></tr></table>" : "<table cellspacing='0' cellpadding='0' style='border-collapse:collapse;'><tr><td>MSCLASS_TEMP_HTML</td></tr><tr><td>MSCLASS_TEMP_HTML</td></tr></table>";
    c = n.Direction > 1 ? n.Width : n.Height;
    f = n.Direction > 1 ? "scrollWidth" : "scrollHeight";
    n.d = n.Direction > 1 ? "scrollLeft" : "scrollTop";
    n.TL = n.Direction > 1 ? "left" : "top";
    if (n.Direction > 4) {
            n.Direction = 2
        }
    if (n.Direction < -1) {
            n.Direction = 0
        }
    n.b = Math.round(n.Width / 2);
    n.c = Math.round(n.Height / 2);
    n.tempHTML = n.ID.innerHTML;
    if (n.Step < 1) {
            n.k = n.Step
        }
    if (n.SwitchType > 0 || (n.DelayTime > 0 && n.ScrollStep == -10)) {
            n.ScrollStep = c
        }
    if (n.ScrollStep == -10) {
            n.ScrollStep = null
        }
    n.BakStep = n.Step;
    if (n.SwitchType > 1) {
            n.SwitchType == 2 ? n.p = 1 : n.q = n.IsIE ? n.SwitchType : 1 - (n.p = 1);
            if (n.IsIE && n.q > 0) {
                n.ID.style.filter = "revealTrans(Duration=" + (n.DelayTime / 1000 * 0.2) + ",Transition=" + (n.q - 10) + ")";
                if (n.q >= 33 || n.q < 10) {
                    n.ID.filters.revealTrans.Transition = Math.round(Math.random() * 22)
                }
                n.ID.filters.revealTrans.apply();
                n.ID.filters.revealTrans.play()
            }
            n.Step = c;
            n.k = 1 - (n.SwitchType = 1)
        }
    var r = [];
    if (n.HiddenID) {
            var g = (typeof n.HiddenID) == "string" ? [n.HiddenID] : n.HiddenID;
            for (i = 0; i < g.length; i++) {
                var h = n.$(g[i]);
                if (h && h.style.display == "none") {
                    n.Hide = 1;
                    r[i] = [h, a(h, "position", "static"), a(h, "top")];
                    h.style.position = "absolute";
                    h.style.visibility = "hidden";
                    h.style.top = "-10000px";
                    h.style.display = "block"
                }
            }
        }
    n.G = function () {
            if (typeof n.A == "object" && (!n.A.length || n.A.length > 0)) {
                n.D = n.$(n.A[1]) || n.$(n.A.ContentID);
                if (n.D) {
                    var z = 0;
                    var m = 0;
                    if (n.D.tagName == "UL") {
                        n.D.style.fontSize = "0"
                    }
                    n.D.style.display = "inline-block";
                    n.D.style.margin = n.D.style.padding = 0;
                    n.D.style.listStyle = "none";
                    for (var u = 0, t = n.D.childNodes.length; u < t; u++) {
                        var C = n.D.childNodes[u];
                        if (C.nodeType == 1) {
                            m++;
                            C.style.listStyle = "none";
                            C.style.styleFloat = C.style.cssFloat = "left";
                            C.style.display = "inline";
                            if (n.Direction > 1) {
                                C.style.marginLeft = a(C, "marginLeft");
                                C.style.marginRight = a(C, "marginRight");
                                C.style.borderLeftWidth = a(C, "borderLeftWidth");
                                C.style.borderRightWidth = a(C, "borderRightWidth");
                                z += C[f] + parseInt(C.style.marginLeft) + parseInt(C.style.marginRight) + parseInt(C.style.borderLeftWidth) + parseInt(C.style.borderRightWidth)
                            } else {
                                C.style.marginTop = a(C, "marginTop");
                                C.style.marginBottom = a(C, "marginBottom");
                                C.style.borderTopWidth = a(C, "borderTopWidth");
                                C.style.borderBottomWidth = a(C, "borderBottomWidth");
                                z += C[f] + parseInt(C.style.marginTop) + parseInt(C.style.marginBottom) + parseInt(C.style.borderTopWidth) + parseInt(C.style.borderBottomWidth)
                            }
                        }
                    }
                    n.Direction > 1 ? (n.D.style.width = z + "px") || (n.D.style.height = n.Height + "px") : (n.D.style.height = z + "px") || (n.D.style.width = n.Width + "px");
                    n.C = parseInt(n.ID[f] / n.ScrollStep);
                    n.B = n.SlideCounter = 1;
                    n.t = [];
                    if (typeof n.A == "object" && (!n.A.length || n.A.length > 1)) {
                        var x = n.$(n.A[2]) || n.A[2] || n.$(n.A.TabID);
                        if (x && (x.length || x.tagName)) {
                            var w = (n.A[3] || n.A.TabEvent || "onmouseover").toString().toLowerCase();
                            (w == "onmouseover" || w == "onclick") ? 0 : w = "onmouseover";
                            n.ScrollStep = c;
                            if (n.Step >= n.ScrollStep) {
                                n.Step = c - 1
                            }
                            var A = parseInt(n.ID[f] / n.ScrollStep);
                            l = x.length || 1;
                            var v = 0;
                            var B = x;
                            for (var y = 0; y < l; y++) {
                                if (l > 1) {
                                    B = n.$(x[y])
                                }
                                B.style.margin = B.style.padding = 0;
                                B.style.listStyle = "none";
                                if (B.tagName == "UL") {
                                    B.style.fontSize = "0"
                                }
                                n.C = B.childNodes.length;
                                for (var u = 0; u < n.C; u++) {
                                    if (B.childNodes[u].nodeType == 1) {
                                        if (A == v) {
                                            B.childNodes[u].style.display = "none";
                                            continue
                                        }
                                        B.childNodes[u].style.fontSize = a(B.childNodes[u], "fontSize", "12px");
                                        B.childNodes[u].style.overflow = "hidden";
                                        n.t[v] = B.childNodes[u];
                                        n.t[v][w] = (function (D) {
                                            return function () {
                                                n.u = 1;
                                                for (var E = 0; E < n.t.length; E++) {
                                                    n.t[E].className = ""
                                                }
                                                n.t[D].className = q;
                                                n.uRun(D)
                                            }
                                        })(v);
                                        n.t[v].onmouseout = (function (D) {
                                            return function () {
                                                n.u = 0;
                                                if (n.i == 0) {
                                                    clearInterval(n.o);
                                                    n.o = setInterval(n.h, n.Timer)
                                                } else {
                                                    clearTimeout(n.f);
                                                    n.f = setTimeout(n.Continue, n.DelayTime)
                                                }
                                                n.uOut(D)
                                            }
                                        })(v);
                                        v += 1
                                    }
                                }
                            }
                            n.C = v;
                            n.r = n.C > 1 ? 1 : 0;
                            if (n.t.length > 0) {
                                n.t[0].className = q
                            }
                            if (A > n.C) {
                                n.s = A - n.C;
                                for (var t = 0; t < n.t.length; t++) {
                                    n.t[t].onmouseover = n.t[t].onmouseout = function () {}
                                }
                                n.C = A;
                                alert("您对[" + n.ID.id + "]设置的分页|TAB数目比实际页数少[" + n.s + "]页\n相关功能被自动屏蔽，请核实！") || 0
                            }
                        }
                    }
                    if (n.SwitchType == 0 && n.p == 0 && n.q == 0 && n.Direction >= 0 && n.Direction <= 3) {
                        if (n.Direction > 1) {
                            n.D.style.width = z * 2 + "px";
                            n.D.style.height = n.Height + "px";
                            n.D.innerHTML += n.D.innerHTML
                        } else {
                            n.D.style.styleFloat = n.D.style.cssFloat = "left";
                            n.D.style.width = n.Width + "px";
                            n.ID.innerHTML += n.ID.innerHTML
                        }
                    }
                }
            }
        };
    n.G();
    if (n.B == 0 && (n.Direction == 0 || n.Direction == 1)) {
            n.ID.innerHTML = b.replace(/MSCLASS_TEMP_HTML/g, n.ID.innerHTML)
        } else {
            if (n.B == 0 && (n.Direction == 2 || n.Direction == 3)) {
                n.ID.noWrap = true;
                n.ID.style.whiteSpace = "nowrap";
                (n.ScrollStep == 0 && n.DelayTime == 0) ? n.ID.innerHTML += n.ID.innerHTML : n.ID.innerHTML = b.replace(/MSCLASS_TEMP_HTML/g, n.ID.innerHTML)
            } else {
                if (n.Direction == 4 || n.Direction == -1) {
                    n.Direction = 6 % n.Direction;
                    n.e = 1
                }
            }
        }
    k = n.ScrollStep;
    s = n.Direction;
    if (n.SwitchType > 0) {
            n.E = document.createElement("div");
            n.E.style.width = n.Width + "px";
            n.E.style.height = n.Height + "px";
            n.E.style.position = "absolute";
            n.E.style[n.TL] = n.Direction % 2 ? -c + "px" : c + "px";
            n.Direction > 1 ? n.E.style.top = "0" : n.E.style.left = "0";
            n.E.innerHTML = n.ID.innerHTML;
            n.E.style.overflow = n.E.style.overflowX = n.E.style.overflowY = "hidden";
            n.ID.appendChild(n.E);
            n.E[n.d] = c
        }
    n.h = function () {
            n.k > 0 ? n.Step = Math.ceil((n.ScrollStep - n.g) * n.k) : 0;
            n.Scroll()
        };
    n.uOut = function (m) {
            if (n.SwitchType > 0 && (n.p == 1 || n.q > 0)) {
                m + 1 >= n.C ? n.E[n.d] = 0 : n.E[n.d] = c * (m + 1)
            }
        };
    n.uRun = function (m) {
            clearTimeout(n.f);
            clearInterval(n.o);
            if (n.SwitchType == 0) {
                n.SlideCounter = parseInt(n.ID[n.d] / k) + 1;
                if (n.SlideCounter > n.C) {
                    n.SlideCounter -= n.C
                }
                m += 1;
                n.u = 1;
                if (m <= n.SlideCounter) {
                    n.ScrollStep = k * (n.SlideCounter - m) + n.ID[n.d] % k;
                    n.Direction = n.Direction > 1 ? 3 : 1
                } else {
                    n.ScrollStep = k * (m - n.SlideCounter) - n.ID[n.d] % k;
                    n.Direction = n.Direction > 1 ? 2 : 0
                }
            } else {
                if (n.i == 0 && n.e == 1) {
                    n.Direction = n.Direction > 1 ? 5 - n.Direction : 1 - n.Direction;
                    s = n.Direction
                }
                n.Direction % 2 ? n.E.style[n.TL] = -c + n.ID[n.d] + "px" : n.E.style[n.TL] = c + n.ID[n.d] + "px";
                m == n.C ? n.E[n.d] = 1 - (n.SlideCounter = 1) : n.E[n.d] = c * (m);
                n.SlideCounter = m + 1
            }
            n.g = 0;
            n.Continue()
        };
    n.Fade = function () {
            clearTimeout(n.m);
            var m = 5;
            (function () {
                n.IsIE ? n.ID.style.filter = "alpha(opacity=" + m + ")" : n.ID.style.opacity = (m / 100);
                m += 5;
                if (m <= 100) {
                    n.m = setTimeout(arguments.callee, 20)
                }
            })()
        };
    n.Continue = function () {
            if (n.p == 1) {
                n.Fade()
            }
            if (n.q > 0) {
                if (n.q >= 33 || n.q < 10) {
                    n.ID.filters.revealTrans.Transition = Math.round(Math.random() * 22)
                }
                n.ID.filters.revealTrans.apply();
                n.ID.filters.revealTrans.play()
            }
            if (n.j == 1) {
                n.f = setTimeout(n.Continue, n.DelayTime)
            } else {
                clearInterval(n.o);
                n.g = n.i = 0;
                if (n.e == 1 && n.k > 0) {
                    if ((n.Direction == 2 || n.Direction == 0) && n.ID[f] - c - n.ID[n.d] < n.ScrollStep) {
                        n.ScrollStep = n.ID[f] - c - n.ID[n.d]
                    }
                    if (n.Direction % 2 && n.ID[n.d] < n.ScrollStep) {
                        n.ScrollStep = n.ID[n.d]
                    }
                }
                if (n.B == 1 && n.u == 0) {
                    n.SlideCounter = parseInt(n.ID[n.d] / k) + 2;
                    if (n.e == 1) {
                        if (n.SwitchType == 1) {
                            if (n.SlideCounter > n.C) {
                                n.SlideCounter = 1
                            }
                        } else {
                            if (n.Direction % 2) {
                                n.SlideCounter -= 2;
                                if (n.SlideCounter <= 0) {
                                    n.SlideCounter = 1
                                }
                            } else {
                                if (n.SlideCounter >= n.C) {
                                    n.SlideCounter = n.C
                                }
                            }
                        }
                    } else {
                        if (n.SlideCounter > n.C) {
                            n.SlideCounter -= n.C
                        }
                    }
                    if (n.r == 1 && n.s == 0) {
                        for (var m = 0; m < n.C; m++) {
                            n.t[m].className = ""
                        }
                        n.e == 0 && n.p == 0 && n.q == 0 && n.SwitchType == 0 && n.Direction % 2 ? n.t[n.SlideCounter + n.C - 2 > n.C ? n.SlideCounter - 3 : n.SlideCounter + n.C - 3].className = q : n.t[n.SlideCounter - 1].className = q
                    }
                }
                if (n.e == 1 && n.Bound >= 0) {
                    n.Bound = -1;
                    n.UnBound()
                }
                n.o = setInterval(n.h, n.Timer);
                n.OnScroll()
            }
        };
    n.Run = function (t) {
            if (n.i == 1) {
                var m = -1;
                if (typeof arguments[0] == "number") {
                    m = arguments[0]
                }
                if (typeof arguments[0] == "string") {
                    s = m = n.n[arguments[0].toString().toLowerCase()]
                }
                if (m < 0 || m > 3) {
                    alert("参数设置错误!");
                    return false
                }
                if (n.Bound == m) {
                    return false
                }
                n.Direction = m;
                if (typeof arguments[0] == "string" || n.e == 1) {
                    s = n.Direction
                }
                clearTimeout(n.f);
                n.f = setTimeout(n.Continue, 0)
            }
        };
    n.OnBound = n.UnBound = n.Terminate = n.OnScroll = function () {};
    n.Pause = function () {
            clearInterval(n.o);
            n.g = 1 - (n.i = 1);
            n.ScrollStep = k;
            n.Direction = s;
            if (n.u == 1) {
                return false
            }
            if (n.e == 1) {
                if (n.SwitchType == 1) {
                    s = n.Direction = n.Direction > 1 ? 5 - n.Direction : 1 - n.Direction
                } else {
                    if (n.ID[n.d] == 0 || n.ID[n.d] >= n.ID[f] - c) {
                        n.Bound = n.Direction;
                        n.OnBound();
                        s = n.Direction = n.Direction > 1 ? 5 - n.Direction : 1 - n.Direction
                    }
                }
            }
            n.f = setTimeout(n.Continue, n.DelayTime)
        };
    var o = function () {
            n.G();
            setTimeout(n.Begin, 0)
        };
    n.Begin = function () {
            n.ClientScroll = n.ID[f] / 2;
            if (n.SwitchType == 0 && n.ClientScroll <= c + n.Step && n.e == 0) {
                fixnum = n.ID.getAttribute("fixnum") / 1 + 1 || 1;
                n.ID.setAttribute("fixnum", fixnum);
                if (fixnum < 5) {
                    o()
                }
                return
            }
            delete(n.tempHTML);
            if (n.e == 1) {
                n.Bound = n.Direction > 1 ? 5 - n.Direction : 1 - n.Direction
            }
            if (n.Hide == 1) {
                for (i = 0; i < r.length; i++) {
                    var m = r[i][0];
                    m.style.position = r[i][1];
                    m.style.display = "none";
                    m.style.visibility = "visible";
                    m.style.top = r[i][2]
                }
            }
            if (n.DelayTime > 0 && n.PrevBtn) {
                n.PrevBtn.onclick = function () {
                    n.Run(n.Direction > 1 ? 5 - n.Direction : 1 - n.Direction)
                }
            }
            if (n.DelayTime > 0 && n.NextBtn) {
                n.NextBtn.onclick = function () {
                    n.Run(n.Direction)
                }
            }
            if (n.WaitTime >= 60000) {
                n.i = 1;
                if (n.WaitTime == 100000) {
                    n.DelayTime = 3600000
                }
                n.WaitTime = 3600000;
                return
            }
            setTimeout(function () {
                if ((n.ScrollStep >= 0 && (n.B == 0 || (n.B == 1 && (n.r == 0 || n.r == 1))) && n.l) || (n.DelayTime == 0 && n.ScrollStep == -2 && n.l)) {
                    n.l()
                }
                n.Continue()
            }, n.WaitTime)
        };
    n.SwitchType == 1 ? n.Scroll = function () {
            n.g += n.Step;
            if (n.g >= n.ScrollStep && n.DelayTime > 0) {
                n.Direction % 2 ? n.E.style[n.TL] = (parseInt(n.E.style[n.TL]) - (n.ScrollStep - n.Step - n.g)) + "px" : n.E.style[n.TL] = (parseInt(n.E.style[n.TL]) + (n.ScrollStep - n.Step - n.g)) + "px";
                n.Pause();
                n.ID[n.d] = n.E[n.d];
                n.Direction % 2 ? n.E.style[n.TL] = -c + n.ID[n.d] + "px" : n.E.style[n.TL] = c + n.ID[n.d] + "px";
                n.SlideCounter == n.C ? n.SlideCounter = 1 - (n.E[n.d] = 0) : n.E[n.d] = c * (n.SlideCounter);
                return
            }
            switch (n.Direction) {
            case 0:
            case 2:
                n.E.style[n.TL] = (parseInt(n.E.style[n.TL]) - n.Step) + "px";
                break;
            case 1:
            case 3:
                n.E.style[n.TL] = (parseInt(n.E.style[n.TL]) + n.Step) + "px";
                break
            }
        } : n.Scroll = function () {
            n.g += n.Step;
            if ((n.g >= n.ScrollStep && n.DelayTime > 0) || (n.e == 1 && n.g > n.Step && (n.ID[n.d] <= 0 || n.ID[n.d] >= n.ID[f] - c))) {
                n.Direction % 2 ? n.ID[n.d] -= n.ScrollStep + n.Step - n.g : n.ID[n.d] += n.ScrollStep + n.Step - n.g;
                n.Pause();
                return
            }
            switch (n.Direction) {
            case 0:
            case 2:
                if (n.ID[n.d] >= n.ClientScroll && n.e == 0) {
                    n.ID[n.d] -= n.ClientScroll
                }
                n.ID[n.d] += n.Step;
                break;
            case 1:
            case 3:
                if (n.ID[n.d] <= n.Step && n.e == 0) {
                    n.ID[n.d] += n.ClientScroll
                }
                n.ID[n.d] -= n.Step;
                break
            }
        };
    setTimeout(n.Begin, 800)
};
Marquee.prototype.l = function () {
    var f = this;
    var b = z = null;
    var a = w = x = y = 0;

    function c(g) {
        var g = g || window.event;
        if (f.DelayTime != 0 || (g.which && g.which != 1) || (g.button && g.button != 1)) {
            return false
        }
        if (a == 0) {
            f.i = a = 1;
            clearInterval(f.o);
            g.stopPropagation ? g.stopPropagation() : g.cancelBuble = true;
            g.preventDefault ? g.preventDefault() : g.returnValue = false;
            x = f.ID[f.d];
            w = f.Direction > 1 ? window.event ? g.clientX : g.pageX : window.event ? g.clientY : g.pageY;
            b = g.srcElement || g.target;
            z = b.style.cursor;
            b.style.cursor = "move";
            if (f.IsIE) {
                b.setCapture();
                document.attachEvent("onmousemove", d);
                document.attachEvent("onmouseup", e)
            } else {
                document.addEventListener("mousemove", d, false);
                document.addEventListener("mouseup", e, false)
            }
        }
    }
    function d(h) {
        var h = h || window.event;
        y = f.Direction > 1 ? window.event ? h.clientX : h.pageX : window.event ? h.clientY : h.pageY;
        var g = w - y + x;
        if (g <= 0 || g >= f.ClientScroll) {
            g <= 0 ? f.ID[f.d] += f.ClientScroll : f.ID[f.d] = f.ClientScroll - g;
            w = f.Direction > 1 ? window.event ? h.clientX : h.pageX : window.event ? h.clientY : h.pageY;
            x = f.ID[f.d];
            g = w - y + x
        }
        f.ID[f.d] = g
    }
    function e(g) {
        if (f.IsIE) {
            b.releaseCapture();
            document.detachEvent("onmousemove", d);
            document.detachEvent("onmouseup", e)
        } else {
            document.removeEventListener("mousemove", d, false);
            document.removeEventListener("mouseup", e, false)
        }
        f.Continue();
        a = f.j = 0;
        b.style.cursor = z;
        if (f.j == 0 || f.ScrollStep == 0) {
            clearInterval(f.o);
            f.o = setInterval(f.h, f.Timer)
        }
    }
    if (f.e == 0) {
        f.IsIE ? f.ID.attachEvent("onmousedown", c) : f.ID.addEventListener("mousedown", c, false)
    }
    if (f.ScrollStep == -2) {
        f.ID.onmousemove = function (g) {
            if (f.Direction > 1) {
                var g = g || window.event;
                if (window.event) {
                    if (f.IsNotOpera) {
                        f.a = g.srcElement.id == f.ID.id ? g.offsetX - f.ID[f.d] : g.srcElement.offsetLeft - f.ID[f.d] + g.offsetX
                    } else {
                        f.ScrollStep = null;
                        return
                    }
                } else {
                    f.a = g.layerX - f.ID[f.d]
                }
                f.Direction = f.a > f.b ? 3 : 2;
                f.Step = Math.round(Math.abs(f.b - f.a) * (f.BakStep * 2) / f.b)
            }
        };
        f.ID.onmouseout = function () {
            if (f.Step == 0) {
                f.Step = 1
            }
        }
    } else {
        f.ID.onmouseover = function () {
            if (f.i == 0 && f.DelayTime > 0) {
                return false
            }
            f.j = 1;
            clearInterval(f.o)
        };
        f.ID.onmouseout = function () {
            f.j = 0;
            if (f.i == 0) {
                clearInterval(f.o);
                f.o = setInterval(f.h, f.Timer)
            }
        }
    }
};