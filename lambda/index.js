const axios = require('axios');

const getTwitterToken = async function () {
    const {
        TWITTER_REQUEST_TOKEN_ENDPOINT,
        TWITTER_KEY,
        TWITTER_SECRET
    } = process.env;
    
    try {
        const result = await axios(TWITTER_REQUEST_TOKEN_ENDPOINT, {
            method: 'post',
            "headers": { 
                "Authorization": `Basic ${TWITTER_KEY}:${TWITTER_SECRET}`,
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            "payload" : "grant_type=client_credentials"
        });
        console.log({ result });
        return result;
    } catch (error) {
        console.log({ error });
        return error;
    }
}

const addAuthToThirdPartyAPIRequest = async function (rawUrl) {
    const {
        TWITTER_API,
        TWITTER_TOKEN
    } = process.env;
    
    let url;
    
    if (rawUrl.match(TWITTER_API)) {
        const result = await getTwitterToken();
        console.log(result)
        url = `${rawUrl}`;
    }
    
    return null;
    // return axios(url);
}

const sendRequest = async function (url) {
    try {
        const result = await addAuthToThirdPartyAPIRequest(url);
        return result;
    } catch (error) {
        return error;
    }
}

exports.handler = async (event) => {
    const result = await sendRequest(event.url);
    
    const response = {
        statusCode: 200,
        body: result,
    };
    
    return response;
};
