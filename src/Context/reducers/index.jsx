import { isEmpty } from "../../Utils";

export default function reducers (state, { type, payload }) {
     // eslint-disable-next-line
    switch (type) {
        case "SET_CURRENT_ADDRESS":
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                wallet: payload,
            };
        default:
            return state;
    }
   
}

