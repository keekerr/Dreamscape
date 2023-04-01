import React, { useState, useEffect } from 'react';
import ReactDom from "react-dom";
import Masonry from "masonry-layout";

function App() {
    const [filter, setFilter] = useState("");

    const filteredImages = images.filter((image) =>
        image.alt.toLowerCase().includes(filter.toLowerCase())
    );

    useEffect(() => {
        new Masonry(".grid", {
            itemSelector: ".grid-item",
            columnWidth: ".grid-sizer",
            gutter: ".gutter-sizer",
            percentPosition: true,
        });
    });

    return (
       <div>
            <input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
            <div className="grid">
                <div className="grid-sizer"></div>
                <div className="gutter-sizer"></div>
                {filteredImages.map((image) => (
                    <div key={image.url} className="grid-item">
                        <img src={image.url} alt={image.alt} />
                    </div>
                 ))}
            </div>
       </div>
    );
}

export default Dashboard;