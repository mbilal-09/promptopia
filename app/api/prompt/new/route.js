import Prompt from "@models/Prompt";
import connectToDB from "@utils/database";

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed tp create prompt", { status: 500 })
    }
}