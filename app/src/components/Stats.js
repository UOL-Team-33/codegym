import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Stats = ({ ready, stats }) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId = null;

    if (ready) {
      intervalId = setInterval(() => {
        let time = elapsedTime;
        // console.log(elapsedTime);
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1100);
    }
    return () => clearInterval(intervalId);
  }, [ready]);

  // Updates accuracy each time a key is typed
  useEffect(() => {
    setAccuracy(stats_accuracy());
  }, [stats]);
  
  // Updates progress with timer change
  useEffect(() => {
    setProgress(stats_progress());
  }, [elapsedTime]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const stats_accuracy = () => {
    // console.log(stats);
    let accuracy = (100 - (stats.wrong * 100) / stats.charsTypedLength).toFixed(
      0
    );
    if (isNaN(accuracy)) return 0;
    return accuracy;
  };

  const stats_progress = () => {
    let progress = Math.floor((stats.charsTypedLength / elapsedTime) * 60);

    if (isNaN(progress)) return 0;
    return progress;
  };

  return (
    <Container>
      <Row>
        <Col className='d-flex align-items-center justify-content-center'>
          <div className='d-flex align-items-center flex-column justify-content-center'>
            <div className='stats-timer'>{formatTime(elapsedTime)}</div>
            <div className='d-flex align-items-center justify-content-around w-100'>
              <div className='stats-wpm'>{progress} CPM</div>
              <div className='stats-accuracy'>{accuracy}% ACC</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
