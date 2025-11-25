const { spawn, exec } = require('child_process')
const waitOn = require('wait-on')

const nextDev = spawn('npx', ['next', 'dev'], {
    stdio: 'inherit',
    shell: true,
})

// Try port 3000 first, then 3001
const tryOpen = port => {
    const url = `http://localhost:${port}`
    return waitOn({
        resources: [url],
        timeout: 10000,
        interval: 500,
    })
        .then(() => {
            exec(`npx open-cli ${url}`, error => {
                if (error) {
                    console.error('Error opening browser:', error)
                }
            })
        })
        .catch(() => {
            // If port 3000 fails, try 3001
            if (port === 3000) {
                tryOpen(3001)
            }
        })
}

tryOpen(3000)

nextDev.on('exit', code => {
    process.exit(code)
})
