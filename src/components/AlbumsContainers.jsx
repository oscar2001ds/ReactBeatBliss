import React, { useEffect } from 'react'
import { Card } from './card'
import { v4 as uuidv4 } from 'uuid';

export const AlbumsContainers = ({ title, list, typeCard, gradientColors }) => {

    const handleXScroll = (e) => {

        const container = document.getElementById(`${title}container`);
        const containerScrollPosition = container.scrollLeft;
        container.scrollTo({
            left: containerScrollPosition + (e.deltaY / 5),
            behaviour: 'smooth'
        })
    }

    const handleCardHoverEvent = (e) => {
        const outerDiv = document.getElementById('discoverPage');
        const innerDiv = document.getElementById(`${title}container`);

        if (e.type === 'mouseenter') {
            if (innerDiv.offsetHeight < innerDiv.scrollHeight || innerDiv.offsetWidth < innerDiv.scrollWidth) {
                outerDiv.style.overflow = 'hidden';
            }

        } else if (e.type === 'mouseleave') {
            outerDiv.style.overflow = 'auto';
        }

    }

    return (
        <div className="flex flex-col justify-start gap-3">
            <strong>{title}</strong>
            <div id={`${title}container`} className={`album-container-scroll w-full h-[230px] overflow-x-auto flex overflow-y-hidden gap-4`} onWheel={handleXScroll}
                onMouseEnter={handleCardHoverEvent} onMouseLeave={handleCardHoverEvent} >

                {
                    list.map((object) => {
                        return (
                            <div key={`card${object.id}`} >
                                <Card
                                    idValue={object.id}
                                    img={`${typeCard === 'songs' ? object.songImg : object.albumImg}`}
                                    title={`${typeCard === 'songs' ? object.songName : object.albumName}`}
                                    desc={`${typeCard === 'songs' ? object.genre + ' ' + object.artistName : object.albumDesc}`}
                                    typeCard={typeCard} 
                                    gradientColors={gradientColors}>
                                </Card>
                            </div>
                        )
                    })
                }

            </div>
        </div>

    )
}

