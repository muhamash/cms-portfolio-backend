"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZodError = void 0;
exports.parseZodError = parseZodError;
const zod_1 = require("zod");
const isZodError = (error) => {
    return error && typeof error === "object" && "issues" in error && Array.isArray(error.issues);
};
exports.isZodError = isZodError;
function parseZodError(error) {
    if (!(error instanceof zod_1.ZodError))
        return [];
    const formatted = error.format();
    const issues = [];
    for (const key in formatted) {
        if (key === "_errors")
            continue;
        const fieldErrors = formatted[key]?._errors;
        if (fieldErrors && fieldErrors.length > 0) {
            fieldErrors.forEach((msg) => {
                issues.push({
                    field: key,
                    message: msg,
                });
            });
        }
    }
    return issues;
}
;
