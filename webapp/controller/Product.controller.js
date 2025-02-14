sap.ui.define(['./BaseController', '../model/formatter'], function (t, e) {
  'use strict'
  return t.extend('sap.ui.demo.cart.controller.Product', {
    formatter: e,
    onInit: function () {
      var t = this.getOwnerComponent()
      this._router = t.getRouter()
      this._router
        .getRoute('product')
        .attachPatternMatched(this._routePatternMatched, this)
      this._router.getTarget('product').attachDisplay(function (t) {
        this.fnUpdateProduct(t.getParameter('data').productId)
      }, this)
    },
    _routePatternMatched: function (t) {
      var e = t.getParameter('arguments').productId,
        a = this.getView(),
        r = a.getModel()
      r.metadataLoaded().then(
        function () {
          var t = '/' + this.getModel().createKey('Products', { ProductId: e })
          a.bindElement({
            path: t,
            events: {
              dataRequested: function () {
                a.setBusy(true)
              },
              dataReceived: function () {
                a.setBusy(false)
              }
            }
          })
          var n = r.getData(t)
          if (!n) {
            a.setBusyIndicatorDelay(0)
            a.getElementBinding().attachEventOnce(
              'dataReceived',
              function () {
                a.setBusyIndicatorDelay(null)
                this._checkIfProductAvailable(t)
              }.bind(this)
            )
          }
        }.bind(this)
      )
    },
    fnUpdateProduct: function (t) {
      var e = "/Products('" + t + "')",
        a = function () {
          this._checkIfProductAvailable(e)
        }
      this.getView().bindElement({ path: e, events: { change: a.bind(this) } })
    },
    _checkIfProductAvailable: function (t) {
      var e = this.getModel()
      var a = e.getData(t)
      if (!a) {
        this._router.getTargets().display('notFound')
      }
    },
    onToggleCart: function (t) {
      var e = t.getParameter('pressed')
      var a = this.getView().getBindingContext().getObject()
      this._setLayout(e ? 'Three' : 'Two')
      this.getRouter().navTo(e ? 'productCart' : 'product', {
        id: a.Category,
        productId: a.ProductId
      })
    }
  })
})
