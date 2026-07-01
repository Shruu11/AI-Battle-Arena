import MarkdownContent from './MarkdownContent'

function SolutionCard({ number, content, score, isWinner }) {
  return (
    <div className={`solution-card ${isWinner ? 'solution-card-winner' : 'solution-card-runner'}`}>
      {/* Card Header */}
      <div className={`solution-card-header ${isWinner ? 'header-winner' : 'header-runner'}`}>
        <div className="solution-card-title">
          <span className="solution-icon">{isWinner ? '💎' : '🚀'}</span>
          <span className="solution-label">Solution {number}</span>
        </div>
        <div className={`score-badge ${isWinner ? 'score-badge-winner' : 'score-badge-runner'}`}>
          <span className="score-icon">{isWinner ? '👑' : '⭐'}</span>
          <span className="score-text">{score}/10</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="solution-card-body">
        <div className="solution-content-scroll">
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  )
}

function JudgeVerdict({ judge }) {
  const winner = judge.solution_1_score >= judge.solution_2_score ? 1 : 2
  const winnerScore = Math.max(judge.solution_1_score, judge.solution_2_score)

  return (
    <div className="judge-verdict">
      {/* Verdict Header */}
      <div className="verdict-header">
        <div className="verdict-divider-left"></div>
        <h3 className="verdict-title">⚖️ Judge's Verdict</h3>
        <div className="verdict-divider-right"></div>
      </div>

      {/* Reasoning Cards */}
      <div className="reasoning-grid">
        {/* Solution 1 Reasoning */}
        <div className="reasoning-card reasoning-card-1">
          <div className="reasoning-header">
            <div className="reasoning-icon-wrap reasoning-icon-1">📊</div>
            <span className="reasoning-label reasoning-label-1">Score Analysis: S1</span>
            <span className="reasoning-score score-1">{judge.solution_1_score}/10</span>
          </div>
          <p className="reasoning-text">{judge.solution_1_reasoning}</p>
        </div>

        {/* Solution 2 Reasoning */}
        <div className="reasoning-card reasoning-card-2">
          <div className="reasoning-header">
            <div className="reasoning-icon-wrap reasoning-icon-2">⚡</div>
            <span className="reasoning-label reasoning-label-2">Score Analysis: S2</span>
            <span className="reasoning-score score-2">{judge.solution_2_score}/10</span>
          </div>
          <p className="reasoning-text">{judge.solution_2_reasoning}</p>
        </div>
      </div>

      {/* Winner Banner */}
      <div className="winner-banner">
        <div className="winner-banner-shine"></div>
        <div className="winner-content">
          <span className="winner-trophy">🏆</span>
          <div className="winner-text-block">
            <p className="winner-subtitle">VICTORY SEQUENCE INITIALIZED</p>
            <h4 className="winner-title">Winner: Solution {winner}</h4>
          </div>
          <span className="winner-medal">🎖️</span>
        </div>
        <div className="winner-score-chip">{winnerScore}/10</div>
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-glow"></div>
      <div className="empty-icon">⚔️</div>
      <h2 className="empty-title">Arena Ready</h2>
      <p className="empty-subtitle">Submit a coding challenge in the chat to begin the AI duel. Two models will compete and a judge will determine the winner.</p>
      <div className="empty-features">
        <div className="feature-pill">💡 Code Problems</div>
        <div className="feature-pill">🤖 AI vs AI</div>
        <div className="feature-pill">⚖️ Judged Fairly</div>
      </div>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-ring">
        <div className="loading-ring-inner"></div>
      </div>
      <h3 className="loading-title">Models Battling...</h3>
      <p className="loading-subtitle">Two AI fighters are crafting their solutions</p>
      <div className="loading-bars">
        <div className="loading-bar bar-1"></div>
        <div className="loading-bar bar-2"></div>
        <div className="loading-bar bar-3"></div>
      </div>
    </div>
  )
}

function BattleResults({ battleData, isLoading }) {
  return (
    <section className="battle-results">
      {/* Atmospheric background */}
      <div className="battle-bg-glow battle-bg-glow-1"></div>
      <div className="battle-bg-glow battle-bg-glow-2"></div>

      {isLoading && <LoadingState />}

      {!isLoading && !battleData && <EmptyState />}

      {!isLoading && battleData && (
        <div className="battle-content">
          {/* Problem Header */}
          <div className="problem-header">
            <span className="problem-icon">💬</span>
            <p className="problem-text">{battleData.problem}</p>
          </div>

          {/* Solution Cards */}
          <div className="solutions-grid">
            <SolutionCard
              number={1}
              content={battleData.solution_1}
              score={battleData.judge.solution_1_score}
              isWinner={battleData.judge.solution_1_score >= battleData.judge.solution_2_score}
            />
            <SolutionCard
              number={2}
              content={battleData.solution_2}
              score={battleData.judge.solution_2_score}
              isWinner={battleData.judge.solution_2_score > battleData.judge.solution_1_score}
            />
          </div>

          {/* Judge's Verdict */}
          <JudgeVerdict judge={battleData.judge} />
        </div>
      )}
    </section>
  )
}

export default BattleResults
