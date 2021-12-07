import React, {Component} from "react";

class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">{this.props.count} Products</div>
                <div className="filter-sort">
                    Order&nbsp;&nbsp;
                    <select value = {this.props.sort} onChange = {this.props.sortProducts}>
                        <option>Latest</option>
                        <option value="Lowest">Lowest</option>
                        <option value="Highest">Highest</option>
                    </select>
                </div>
                <div className="filter-size">
                    Filter&nbsp;&nbsp;
                    <select value = {this.props.size} onChange = {this.props.filterProducts}>
                        <option value="ALL">ALL</option>
                        <option value="40">40</option>
                        <option value="42">42</option>
                        <option value="44">44</option>
                        <option value="46">46</option>
                        <option value="48">48</option>
                        <option value="50">50</option>
                        <option value="52">52</option>
                        <option value="54">54</option>
                        <option value="56">56</option>
                        <option value="58">58</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default Filter