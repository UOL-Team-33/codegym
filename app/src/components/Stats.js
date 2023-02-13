import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Stats = ({ ready, stats }) => {
    const [statsCorrect, setStatsCorrect] = useState(0);
    const [statsWrong, setStatsWrong] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let intervalId = null

        if (ready) {
            const intervalId = setInterval(() => {
                setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [ready]);

    useEffect(() => {
        setStatsCorrect(stats.correct)
        setStatsWrong(stats.wrong)
        setAccuracy(stats_accuracy())
        setProgress(stats_progress())
    }, [stats]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const stats_accuracy = () => {
        let accuracy = ((100 - (stats.wrong * 100) / stats.charsTypedLength).toFixed(2));
        return accuracy;
    };

    const stats_progress = () => {
        let progress = ((stats.maxIndex * 100) / stats.charsToTypeLength).toFixed(2);
        return progress;
    };

  return (
          <Container>
              <Row >
                  <Col>
                      <h1>Accuracy</h1>
                      {accuracy}
                  </Col>
                  <Col>
                      <h1>Timer</h1>
                      {formatTime(elapsedTime)}
                  </Col>
                  <Col>
                      <h1>Progress</h1>
                      {progress}
                  </Col>
              </Row>
              {/*<div id='stats'>*/}
              {/*    <div className='timer'>{timer}</div>*/}
              {/*    <div className='wpm-acc'>*/}
              {/*        <div className='wpm' title='Words Per Minute'>*/}
              {/*            {wpm}% <small>wpm</small>*/}
              {/*        </div>*/}
              {/*        <div className='acc' title='Accuracy'>*/}
              {/*            {accuracy}% <small>accuracy</small>*/}
              {/*        </div>*/}
              {/*    </div>*/}
              {/*</div>*/}
          </Container>
  );
}

export default Stats;
