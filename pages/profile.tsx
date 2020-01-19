import { Button, Layout } from 'antd';
import axios from '../utils/axios';
import { connect } from 'react-redux'
import router from 'next/router';

const { Content } = Layout;

function Profile(props) {
    return (
        <Content>
            <div>
                当前的登录用户:{props.currentUser.username}
            </div>
        </Content>

    )
}
Profile.getInitialProps = async function (ctx) {
    let options: any = {
        url: '/api/currentUser'
    }
    
    if (ctx.req && ctx.req.headers.cookie) {
        options.headers = options.headers || {};
        options.headers.cookie = ctx.req.headers.cookie;
    }
    let response = await axios(options);
    if (response.data.code === 0) {
        return {};
    } else {
        if (ctx.req) {
            ctx.res.writeHead(302, { Location: '/login' });
            ctx.res.end();
        } else {
            router.push('/login');
        }
        return {};
    }
}
export default connect(state => state)(Profile);
