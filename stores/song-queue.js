import React, { createContext, useContext, useState } from "react";

const SongQueueContext = createContext();

export const useSongQueue = () => {
    return useContext(SongQueueContext);
}

export const SongQueueProvider = ({ children }) => {
    // songQueue is an array of songs IDs
    const [songQueue, setSongQueue] = useState([]);

    // Current Playing Song ID
    const [currentSong, setCurrentSong] = useState(null);
    
    // Song control configurations
    const [queueMetaData, setQueueMetaData] = useState({
        nextIndex: -1, 
        previousIndex: -1
    });

    const updateSongQueue = (currentSong, queue = songQueue) => {
        setCurrentSong(currentSong);
        setSongQueue(queue);

        // Update Control Configuration according to current song in the queue
        const currentSongIndex = queue.indexOf(currentSong);
        if (queue.length > 1 && currentSongIndex >= 0) {
            if (currentSongIndex == 0) {
                setQueueMetaData({
                    nextIndex: currentSongIndex + 1,
                    previousIndex: -1, 
                })
            } else if (currentSongIndex == queue.length - 1) {
                setQueueMetaData({
                    nextIndex: -1,
                    previousIndex: currentSongIndex - 1, 
                })
            } else {
                setQueueMetaData({
                    nextIndex: currentSongIndex + 1,
                    previousIndex: currentSongIndex - 1, 
                });
            }
        } else {
            setQueueMetaData({
                nextIndex: -1,
                previousIndex: -1, 
            });
        }
    }

    
    const resetSongQueue = () => {
        setCurrentSong(null)
        setSongQueue([]);
    }
    
    return <SongQueueContext.Provider 
        value={{
            currentSong,
            songQueue,
            queueMetaData,
            resetSongQueue,
            updateSongQueue
        }}
    >
        {children}
    </SongQueueContext.Provider>
}