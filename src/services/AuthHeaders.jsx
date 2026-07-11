

export const getAuthHeaders = () => ({
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("switch_token")).token}`
            }
        })