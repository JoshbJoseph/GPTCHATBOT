import Chatbot from "@/components/Chatbot/chatbot";


export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="retro-monitor">
        <div className="w-[600px] h-[400px] screen flex flex-col">
          <div className="p-4 border-b border-green-500/30">
            <h1 className="text-xl font-mono text-green-500">AI Chatbot</h1>
          </div>
          <div className="flex-1">
            <Chatbot />
          </div>
        </div>
        <div className="h-4 bg-[--monitor-color] mt-2 rounded-sm"></div>
        <div className="h-16 bg-[--monitor-color] mt-2 rounded-sm flex items-center justify-between px-4">
          <div className="w-20 h-2 bg-gray-600 rounded"></div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </main>
  );
}