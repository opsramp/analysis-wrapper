import { INSTAGRAM } from "constants/types"
import { api, authApi, formData, externalApi } from "utils"

// Get Workout for Dashboard
export const getInstagramFeed = () => {
    return (dispatch) => {
        let data = {
            method: "get",
            url: `https://www.instagram.com/fitly_app_/?__a=1`,
        }
        return externalApi(data)
            .then((res) => {
                dispatch({
                    type: INSTAGRAM.INSTAGRAM_FEED,
                    payload: res.data ? res.data : [],
                })
                return res
            })
            .catch((err) => {
                throw err
            })
    }
}





