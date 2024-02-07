import { useEffect, useState } from "react";

const getSeconds = (time) => {
  const seconds = Number(time % 60);
  if (seconds < 10) {
    return "0" + String(seconds);
  } else {
    return String(seconds);
  }
};

const Timer = () => {
  const [time, setTime] = useState(1); // 남은 시간 (단위: 초)
  const [isPaused, setIsPaused] = useState(true); // 일시정지 여부
  const [smallBlind, setSmallBlind] = useState(1);
  const [bigBlind, setBigBlind] = useState(2);
  const [anti, setAnti] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            // 시간이 0이 되었을 때 smallBlind와 bigBlind 변경
            // switch 추가
            setSmallBlind((prevSmallBlind) => prevSmallBlind + 1);
            setBigBlind((prevBigBlind) => prevBigBlind + 1);
            // 시간 초기화 및 타이머 정지
            setTime(480);
            setIsPaused(true);
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time, isPaused]);

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev); // 일시정지 상태
  };

  return (
    <div>
      <h1>남은 시간</h1>
      <div>
        <span>
          {parseInt(time / 60)} : {getSeconds(time)}
        </span>
      </div>
      <div>
        <span>
          SB : {smallBlind} / BB : {bigBlind}
        </span>
      </div>
      <div>
        <span>Anti : {anti}</span>
      </div>
      <div>
        <span>Level : {level}</span>
      </div>
      <button onClick={handlePauseResume}>{isPaused ? "시작" : "정지"}</button>
    </div>
  );
};

export default Timer;
