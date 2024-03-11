import { resolve } from 'path'
import ejs from 'ejs'

const ejsToHtml = async (data: Record<string, any>, templateName: string): Promise<string> => {
    try {
        const htmlTemplate = await ejs.renderFile(
            resolve(
                `./src/views/${templateName}.ejs`
            ),
            data
        )
        return htmlTemplate
    } catch (error) {
        console.log(error)
        throw new Error('Failed to render ejs to html')
    }
}

export default {
    ejsToHtml
}
