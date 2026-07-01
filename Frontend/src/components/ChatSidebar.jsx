function ChatSidebar({
  messages,
  inputValue,
  isLoading,
  onInputChange,
  onSend,
  onKeyDown,
  messagesEndRef
}) {
  return (
    <aside className="chat-sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-header-left">
          <span className="sidebar-icon">⚔️</span>
          <h2 className="sidebar-title">Battle Arena</h2>
        </div>
        <div className="live-badge">Live Mode</div>
      </div>

      {/* Chat History */}
      <div className="chat-history">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.type}`}>
            {msg.type === 'system' && (
              <div className="message system-message">
                <div className="message-avatar system-avatar">🤖</div>
                <div className="message-body">
                  <span className="message-label">System Prime</span>
                  <div className="message-bubble system-bubble">
                    {msg.content}
                  </div>
                </div>
              </div>
            )}
            {msg.type === 'user' && (
              <div className="message user-message">
                <div className="message-body user-body">
                  <span className="message-label user-label">Commander (You)</span>
                  <div className="message-bubble user-bubble">
                    {msg.content}
                  </div>
                </div>
                <div className="message-avatar user-avatar">👤</div>
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="loading-indicator">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-text">MODELS CALCULATING...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="input-area">
        <div className="input-wrapper">
          <textarea
            id="chat-input"
            className="chat-input"
            placeholder="Enter your coding challenge..."
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isLoading}
            rows={3}
          />
          <button
            id="send-btn"
            className={`send-btn ${isLoading ? 'send-btn-disabled' : ''}`}
            onClick={onSend}
            disabled={isLoading}
            aria-label="Send message"
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
        <div className="input-meta">
          <span className="meta-item">🔤 {inputValue.length} chars</span>
          <span className="meta-item">⚡ Ultra-Fast Mode</span>
        </div>
      </div>
    </aside>
  )
}

export default ChatSidebar
