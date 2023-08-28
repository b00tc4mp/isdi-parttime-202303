import context from "./context";

/**
 * Logs out the current user by removing token from context.
 */

export default () => context.token = null