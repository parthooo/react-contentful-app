import * as contentful from 'contentful'

export const client = contentful.createClient ({
    space : process.env.REACT_APP_SPACE_ID,
    environment: process.env.REACT_APP_environment_id_master,
    accessToken: process.env.REACT_APP_SPACE_TOKEN
})