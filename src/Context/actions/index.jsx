export const setCurrentUser = (auth) => {
    return {
        type: "SET_CURRENT_ADDRESS",
        payload: auth,
    }
}
