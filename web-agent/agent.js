import {TavilySearchResults} from "@langchain/community/tools/tavily_search"
import {ChatOpenAI} from "@langchain/openai"
import {MemorySaver} from "@langchain/langgraph"
import {HumanMessage} from "@langchain/core/messages"
import {createReactAgent} from "@langchain/langgraph/prebuilt"

const agentTools = [new TavilySearchResults({maxResults: 3})]
const agentModel = new ChatOpenAI({temperature: 0})

const agentCheckpointer = new MemorySaver()

const agent = createReactAgent({
    llm: agentModel,
    tools: agentTools,
    checkpointSaver: agentCheckpointer
})

const agentFirstState = await agent.invoke(
    {messages : [new HumanMessage("Who is the current Prime Minister of the United Kingdom")]},
    {configurable: {thread_id : "42"}}
)

console.log(agentFirstState.messages[agentFirstState.messages.length - 1].content)
