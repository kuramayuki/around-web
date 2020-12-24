import React, {useState} from 'react';
import { Input } from 'antd';
import {Radio} from 'antd';
import {SEARCH_KEY} from '../constants'

const {Search} = Input;

function SearchBar(props) {
    const [searchType, setSearchType] = useState(SEARCH_KEY.all);
    const [error, setError] = useState("");

    const handleSearch = value => {
        console.log(value);
        //case1 : has error
        if ( value === "" && searchType !== SEARCH_KEY.all ) {
            setError("Please input your search keyword!");
            return;
        }
        setError("");
        //case2: do search
        //inform Home to fetch data
        //pass search word + type -> Home props.fn
        props.handleSearch({type:searchType, keyword:value})

    }

    const changeSearchType = e => {
        const searchType = e.target.value;
        console.log(searchType);
        setSearchType(searchType);
        setError("");
        if (searchType === SEARCH_KEY.all){
            props.handleSearch({type: SEARCH_KEY.all, keyword:""})
        }

    }

    return (
        <div className="search-bar">
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                disabled={searchType === SEARCH_KEY.all}
                onSearch={handleSearch}
            />

            <p className="error-msg">{error}</p>

            <Radio.Group
                onChange={changeSearchType}
                value={searchType}
                className="search-type-group"
            >
                <Radio value={SEARCH_KEY.all}>All</Radio>
                <Radio value={SEARCH_KEY.keyword}>Keyword</Radio>
                <Radio value={SEARCH_KEY.user}>User</Radio>
            </Radio.Group>
        </div>
    );
}

export default SearchBar;