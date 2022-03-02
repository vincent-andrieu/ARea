job("Project") {
    scm {
        git {
            remote {
                github("$GIT_REPOSITORY_URL", 'ssh')
                credentials('my_id')
                branch("main")
            }
        }
    }
    triggers {
        pollSCM {
            scmpoll_spec('* * * * *')
        }
    }
    steps {
        shell('cp /app/.env server/.env && docker-compose down && docker-compose up -d --build')
    }
}