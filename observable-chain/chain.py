from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.tracers.context import tracing_v2_enabled

myPrompt = ChatPromptTemplate.from_messages([
    ("system", "You are an Expert Javascript Teacher"),
    ("user", "{question}")
])

openAIModel = ChatOpenAI(model="gpt-4o")
parser = StrOutputParser()

chain = myPrompt | openAIModel | parser

question = "What are Closures?"

"""
with tracing_v2_enabled():
    response = chain.invoke({"question": question})

print(response)
"""

with tracing_v2_enabled():
    openAIModel.invoke("Who created Javascript?")
