import { INSTAGRAM } from "constants/types"

const initState = {
    instaFeed: [],
}

const InstaReducer = (state = initState, action) => {
    const { type, payload } = action

    switch (type) {
        case INSTAGRAM.INSTAGRAM_FEED:
            return {
                ...state,
                instaFeed: "payload",
            }

        default:
            return state
    }
}

export default InstaReducer
