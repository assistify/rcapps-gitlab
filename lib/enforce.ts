// to make sure that no "undefined" can get displayed in RC
// "!" does not seem to work for RC plugins (tsconfig is being ignored)
export function enforce<T>(param: T): T {
    if (param === undefined) {
        throw new Error();
    }
    return param;
}