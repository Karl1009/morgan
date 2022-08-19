"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(message, _statusCode) {
        if (_statusCode === void 0) { _statusCode = 200; }
        var _this = _super.call(this, message) || this;
        _this.isCustomError = true;
        _this.name = "Exception";
        _this.statusCode = _statusCode;
        return _this;
    }
    return Exception;
}(Error));
exports.default = Exception;
