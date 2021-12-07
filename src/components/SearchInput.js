import React, {Component} from "react"

class SearchInput extends Component {

    render() {
        return (
            <div className="search-items">
                    <ul>
                        {this.props.items.slice(0, this.props.countItemToShow).map((item) => (
                            <li key= {item._id}>
                                <button onClick = {() => this.props.handle(item.title)} >{item.title}</button>
                            </li>
                        ))}
                    </ul>
            </div>
        )
    }
}

export default SearchInput