import { spawn } from 'child_process';
let AutoRun = {
    name: 'autoRun',
    setup(build) {
        build.onEnd(result => {
            // 清除控制台输出
            console.clear()
            // node 运行 ./dist/index.js
            const child = spawn('node', ['dist/index.js']);
            child.stdout.on('data', data => {
                console.log(data.toString());
            })
        })
    }
}
export { AutoRun };