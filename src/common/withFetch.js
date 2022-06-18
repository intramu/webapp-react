import React from "react";

function withFetch(WrappedComponent) {
    class WithFetch extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: [],
                isLoading: false,
                isError: false
            }
        }

        // componentDidMount() {
        //     if (requestUrl) {
        //         this.fetchData(requestUrl)
        //     }
        // }

        fetchData = async (requestUrl) => {
            this.setState({
                data: [],
                isLoading: true,
                isError: false
            })

            try {
                const response = await fetch(requestUrl)

                if (response.ok) {
                    const data = await response.json()
                    this.setState({
                        data,
                        isLoading: false
                    })
                }
                else {
                    throw new Error('Fetch request error')
                }
            } catch (error) {
                console.log(error);
                this.setState({
                    isLoading: false,
                    isError: true
                })
            }
        }
        render() {
            if (this.state.isLoading) {
                return <div>Loading...</div>
            }
            return (
                <WrappedComponent {...this.state} {...this.props} getData={(requestUrl) => this.fetchData(requestUrl)} />
            )
        }
    }

    return WithFetch
}

export default withFetch;