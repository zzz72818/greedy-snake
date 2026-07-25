import { SnakeGame } from "./components/SnakeGame";

export default function Home() {
  return (
    <main className="site-shell">
      <section className="intro" aria-labelledby="game-title">
        <div className="eyebrow">
          <span className="status-dot" />
          ARCADE MODE · ONLINE
        </div>
        <h1 id="game-title">
          GREEDY
          <br />
          <span>SNAKE</span>
        </h1>
        <p className="intro-copy">
          吃下果實、拉長身體，別讓野心撞上自己。
          <br />
          你能撐過幾回合？
        </p>
        <div className="keyboard-hint" aria-hidden="true">
          <span className="key">W</span>
          <div>
            <span className="key">A</span>
            <span className="key">S</span>
            <span className="key">D</span>
          </div>
          <small>或使用方向鍵移動</small>
        </div>
      </section>

      <SnakeGame />
    </main>
  );
}
