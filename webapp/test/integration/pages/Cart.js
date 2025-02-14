sap.ui.define(
  [
    'sap/ui/test/Opa5',
    './Common',
    'sap/ui/test/matchers/AggregationFilled',
    'sap/ui/test/matchers/AggregationEmpty',
    'sap/ui/test/matchers/Properties',
    'sap/ui/test/matchers/AggregationContainsPropertyEqual',
    'sap/ui/test/matchers/AggregationLengthEquals',
    'sap/ui/test/matchers/BindingPath',
    'sap/ui/test/actions/Press'
  ],
  function (e, t, r, s, n, o, i, a, c) {
    'use strict'
    e.createPageObjects({
      onTheCart: {
        baseClass: t,
        viewName: 'Cart',
        actions: {
          iPressOnTheEditButton: function () {
            return this.waitFor({
              controlType: 'sap.m.Button',
              matchers: new n({ icon: 'sap-icon://edit' }),
              actions: new c(),
              errorMessage: 'The edit button could not be pressed'
            })
          },
          iPressOnTheDeleteButton: function () {
            return this.waitFor({
              id: 'entryList',
              matchers: new n({ mode: 'Delete' }),
              actions: function (e) {
                e.fireDelete({ listItem: e.getItems()[0] })
              },
              errorMessage: 'The delete button could not be pressed'
            })
          },
          iPressOnTheSaveChangesButton: function () {
            return this.waitFor({
              controlType: 'sap.m.Button',
              matchers: function (e) {
                return this.I18NTextExtended(e, 'cartDoneButtonText', 'text')
              }.bind(this),
              actions: new c(),
              errorMessage: 'The accept button could not be pressed'
            })
          },
          iPressOnTheProceedButton: function () {
            return this.waitFor({ id: 'proceedButton', actions: new c() })
          },
          iPressOnSaveForLaterForTheFirstProduct: function () {
            return this.waitFor({
              controlType: 'sap.m.ObjectAttribute',
              matchers: new a({
                path: '/cartEntries/HT-1254',
                modelName: 'cartProducts'
              }),
              actions: new c()
            })
          },
          iPressOnAddBackToBasketForTheFirstProduct: function () {
            return this.waitFor({
              controlType: 'sap.m.ObjectAttribute',
              matchers: new a({
                path: '/savedForLaterEntries/HT-1254',
                modelName: 'cartProducts'
              }),
              actions: new c()
            })
          },
          iPressTheBackButton: function () {
            this.waitFor({
              controlType: 'sap.m.Button',
              matchers: new n({ type: 'Back' }),
              actions: new c(),
              errorMessage:
                'The back button was not found and could not be pressed'
            })
          }
        },
        assertions: {
          iShouldSeeTheProductInMyCart: function () {
            return this.waitFor({
              id: 'entryList',
              matchers: new r({ name: 'items' }),
              success: function () {
                e.assert.ok(true, 'The cart has entries')
              },
              errorMessage: 'The cart does not contain any entries'
            })
          },
          iShouldSeeTheCart: function () {
            return this.waitFor({
              success: function () {
                e.assert.ok(true, 'The cart was successfully displayed')
              },
              errorMessage: 'The cart was not displayed'
            })
          },
          iShouldNotSeeASaveForLaterFooter: function () {
            return this.waitFor({
              id: 'entryList',
              success: function (t) {
                e.assert.strictEqual(
                  '',
                  t.getFooterText(),
                  'The footer is not visible'
                )
              },
              errorMessage: 'The footer is still visible'
            })
          },
          iShouldSeeAnEmptyCart: function () {
            return this.waitFor({
              id: 'entryList',
              matchers: new s({ name: 'items' }),
              success: function () {
                e.assert.ok(true, 'The cart has no entries')
              },
              errorMessage: 'The cart does not contain any entries'
            })
          },
          theProceedHelper: function (t) {
            var r = 'The proceed button is enabled'
            var s = 'The proceed button is disabled'
            if (t) {
              r = 'The proceed button is disabled'
              s = 'The proceed button is enabled'
            }
            return this.waitFor({
              controlType: 'sap.m.Button',
              autoWait: t,
              matchers: new n({ type: 'Accept' }),
              success: function (r) {
                e.assert.strictEqual(r[0].getEnabled(), t, s)
              },
              errorMessage: r
            })
          },
          iShouldSeeTheProceedButtonDisabled: function () {
            return this.theProceedHelper(false)
          },
          iShouldSeeTheProceedButtonEnabled: function () {
            return this.theProceedHelper(true)
          },
          theEditButtonHelper: function (t) {
            var r = 'The edit button is enabled'
            var s = 'The edit button is disabled'
            if (t) {
              r = 'The edit button is disabled'
              s = 'The edit button is enabled'
            }
            return this.waitFor({
              controlType: 'sap.m.Button',
              autoWait: t,
              matchers: new n({ icon: 'sap-icon://edit', enabled: t }),
              success: function (r) {
                e.assert.strictEqual(r[0].getEnabled(), t, s)
              },
              errorMessage: r
            })
          },
          iShouldSeeTheEditButtonDisabled: function () {
            return this.theEditButtonHelper(false)
          },
          iShouldSeeTheEditButtonEnabled: function () {
            return this.theEditButtonHelper(true)
          },
          iShouldSeeTheDeleteButton: function () {
            return this.waitFor({
              controlType: 'sap.m.List',
              matchers: new n({ mode: 'Delete' }),
              success: function (t) {
                e.assert.ok(t[0], 'The delete button was found')
              },
              errorMessage: 'The delete button was not found'
            })
          },
          iShouldNotSeeTheDeletedItemInTheCart: function () {
            return this.waitFor({
              id: 'entryList',
              matchers: function (e) {
                var t = new o({
                  aggregationName: 'items',
                  propertyName: 'title',
                  propertyValue: 'Bending Screen 21HD'
                }).isMatching(e)
                return !t
              },
              success: function () {
                e.assert.ok(true, 'The cart does not contain our product')
              },
              errorMessage: 'The cart contains our product'
            })
          },
          iShouldBeTakenToTheCart: function () {
            return this.waitFor({
              id: 'entryList',
              success: function (t) {
                e.assert.ok(t, 'The cart was found')
              },
              errorMessage: 'The cart was not found'
            })
          },
          iShouldSeeOneProductInMySaveForLaterList: function () {
            return this.waitFor({
              id: 'saveForLaterList',
              success: function (t) {
                e.assert.strictEqual(
                  t.getItems().length,
                  1,
                  'Product saved for later'
                )
              }
            })
          },
          iShouldSeeAnEmptySaveForLaterList: function () {
            return this.waitFor({
              id: 'saveForLaterList',
              matchers: new s({ name: 'items' }),
              success: function (t) {
                e.assert.ok(true, 'The savelist was empty')
              },
              errorMessage: 'The savelist still has entries'
            })
          },
          iShouldSeeTheWelcomeScreen: function () {
            return this.waitFor({
              id: 'saveForLaterList',
              success: function (t) {
                e.assert.strictEqual(
                  t.getItems().length,
                  1,
                  'Product saved for later'
                )
              }
            })
          },
          iShouldSeeTheTotalPriceEqualToZero: function () {
            return this.waitFor({
              id: 'totalPriceText',
              matchers: function (e) {
                return this.I18NTextExtended(
                  e,
                  'cartTotalPrice',
                  'text',
                  null,
                  ['0,00 BRL']
                )
              }.bind(this),
              success: function () {
                e.assert.ok(true, 'Total price is updated correctly')
              },
              errorMessage: 'Total price is not updated correctly'
            })
          },
          iShouldSeeTheTotalPriceUpdated: function () {
            return this.waitFor({
              id: 'totalPriceText',
              matchers: function (e) {
                return this.I18NTextExtended(
                  e,
                  'cartTotalPrice',
                  'text',
                  null,
                  ['250,00 BRL']
                )
              }.bind(this),
              success: function () {
                e.assert.ok(true, 'Total price is updated correctly')
              },
              errorMessage: 'Total price is not updated correctly'
            })
          }
        }
      }
    })
  }
)
