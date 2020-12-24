import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import {Tabs, message, Row, Col, Button} from 'antd';
import CreatePostButton from './CreatePostButton';
import {SEARCH_KEY, BASE_URL, TOKEN_KEY} from '../constants';
import axios from 'axios';
import PhotoGallery from './PhotoGallery';


const {TabPane} = Tabs;

function Home(props) {
    const [activeTab, setActiveTab] = useState('image');
    const [post, setPost] = useState([]);
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    });

    const handleSearch = (value) => {
        console.log('home', value);
        //{type, keyword}
        const { type, keyword } = value;
        setSearchOption({ type: type, keyword: keyword });
    };

    //fetch data
    useEffect( () => {
        console.log('in effect', searchOption);
        const {type, keyword} = searchOption;
        fetchPost(searchOption);
    }, [searchOption]);

    const fetchPost = option => {
        const {type, keyword} = option;
        let url = '';
        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.keyword) {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        } else {
            url = `${BASE_URL}/search?user=${keyword}`;
        }

        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }

        }

        axios(opt)
            .then((res) => {
                if(res.status === 200) {
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    };

    const renderPosts = (type) => {
        //case 1: post empty -> nodata
        //case 2: type === image -> image
        //case 3: type === video -> video
        if( !post || post.length === 0 ) {
            return <div>no data</div>
        }
        if ( type === 'image') {
            //filter
            //map
            const arr = post.filter(item => item.type === 'image')
                .map((image) => {
                    return {
                        src: image.url,
                        user: image.user,
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });

            return <PhotoGallery images={arr}/>;
        } else if ( type === 'video') {
            return (
                <Row gutter={32}>
                    {post
                        .filter((item) => item.type === "video")
                        .map((item) => (
                            <Col span={8} key={item.url}>
                                <video src={item.url} controls={true} className="video-block" />
                                <p>
                                    {item.user}: {item.message}
                                </p>
                            </Col>
                        ))}
                </Row>
            );
        }
    }

    const showPost= (type) => {
        console.log("type -> ", type);
        setActiveTab(type);

        setTimeout(() => {
            setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
        }, 3000);
    }

    const operations = <CreatePostButton onShowPost={showPost}>Post</CreatePostButton>;
    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch}/>
            <div className="display">
                <Tabs tabBarExtraContent = {operations}
                    onChange={(key) => setActiveTab(key)}
                    defaultActiveKey="image"
                    activeKey={activeTab}
                    // tabBarExtraContent={operations}
                >
                    <TabPane tab="Images" key="image">
                        {renderPosts('image')}
                    </TabPane>
                    <TabPane tab="Videos" key="video">
                        {renderPosts('video')}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;