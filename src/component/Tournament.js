import { useEffect, useState } from "react";
import Button from "@mui/material/Button";

const getSeconds = (time) => {
  const seconds = Number(time % 60);
  if (seconds < 10) {
    return "0" + String(seconds);
  } else {
    return String(seconds);
  }
};

const Timer = () => {
  const [time, setTime] = useState(600); // 남은 시간 (단위: 초)
  const [isPaused, setIsPaused] = useState(true); // 일시정지 여부
  const [smallBlind, setSmallBlind] = useState(1);
  const [bigBlind, setBigBlind] = useState(2);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    let timer;
    if (!isPaused) {
      timer = setInterval(() => {
        setTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            if (level < 5) {
              setSmallBlind(smallBlind + 1);
              setBigBlind(bigBlind + 2);
            } else if (level < 6) {
              setSmallBlind(smallBlind + 5);
              setBigBlind(bigBlind + 10);
            } else if (level < 10) {
              setSmallBlind(smallBlind + 10);
              setBigBlind(bigBlind + 20);
            } else if (level < 14) {
              setSmallBlind(smallBlind + 50);
              setBigBlind(bigBlind + 100);
            }

            // 시간 초기화 및 타이머 정지
            setTime(600);
            setIsPaused(true);
            clearInterval(timer);
            setLevel(level + 1);
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [time, isPaused]);

  // level 6, 12 일때 Break Time
  // level 14 일때 Last Blind Up
  useEffect(() => {
    if (level === 6 || level === 11) {
      alert("Break Time");
    } else if (level === 14) {
      alert("Last Blind Up");
    } else if (level !== 1) {
      alert("Next Hand Blind Up");
    }
  }, [level]);

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev); // 일시정지 상태
  };

  return (
    <div>
      <h1 className="title">Tournament</h1>
      <div className="timer">
        <span>
          {parseInt(time / 60)} : {getSeconds(time)}
        </span>
      </div>
      <div className="blind">
        <span>
          SB : {smallBlind} / BB : {bigBlind}
        </span>
      </div>
      <div className="level">
        <span>Level : {level}</span>
      </div>
      <Button
        variant="outlined"
        onClick={handlePauseResume}
        onKeyDown={(e) => {
          console.log(e);
        }}
      >
        {isPaused ? "Start" : "Pause"}
      </Button>
    </div>
  );
};

export default Timer;
