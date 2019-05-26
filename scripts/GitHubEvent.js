const GITHUB_ICON_PATH_PREFIX = '/assets/github/';

class GitHubEvent {
    constructor(event, index) {
        this.data = event;
        this.index = index;

        this.id = event.id;
        this.title = `${this.getName()}.`;
        this.icon = this.getIcon();
        this.repo = {
            name: event.repo.name,
            apiUrl: event.repo.url
        };
    }

    get timeFromNow() {
        const createdAt = this.data.created_at;
        return moment(createdAt).fromNow();
    }

    getName() {
        const { type, payload = {} } = this.data;
        const { action, ref_type, pages, commits, issue = {} } = payload;
        const { pull_request } = issue;
        switch (type) {
            default: {
                return '';
            }
            case 'CommitCommentEvent': {
                return 'left a comment on a commit';
            }
            case 'CreateEvent': {
                return `created a ${ref_type}`;
            }
            case 'DeleteEvent': {
                return `deleted a ${ref_type}`;
            }
            case 'ForkEvent': {
                return 'forked a repository';
            }
            case 'GollumEvent': {
                return `${pages[0].action} a wiki page`;
            }
            case 'IssueCommentEvent': {
                if (pull_request) {
                    return 'commented on a pull request';
                }

                // 'edited' and 'deleted' are not public
                return 'commented on an issue';
            }
            case 'IssuesEvent': {
                return `${action} an issue`;
            }
            case 'PullRequestEvent': {
                // TODO: there might be some other public actions whose wording does not work very well like that
                return `${action} a pull request`;
            }
            case 'PullRequestReviewEvent': {
                // need to be tested
                return `${action} a review on a pull request`;
            }
            case 'PullRequestReviewCommentEvent': {
                // 'edited' and 'deleted' are not public
                return `commented on a pull request`;
            }
            case 'PushEvent': {
                const commitCount = commits.length;
                return `pushed ${commitCount} commit${
                    commitCount > 1 ? 's' : ''
                }`;
            }
            case 'WatchEvent': {
                return `${action} watching a repository`;
            }
        }
    }

    getIcon() {
        let path = GITHUB_ICON_PATH_PREFIX;
        const { type, payload = {} } = this.data;
        const { action, ref_type } = payload;
        switch (type) {
            default: {
                return '';
            }
            case 'CreateEvent': {
                switch (ref_type) {
                    default: {
                        return '';
                    }
                    case 'branch': {
                        path += 'git-branch';
                        break;
                    }
                    case 'repository': {
                        path += 'repo';
                        break;
                    }
                }
                break;
            }
            case 'DeleteEvent': {
                path += 'trashcan';
                break;
            }
            case 'CommitCommentEvent':
            case 'IssueCommentEvent':
            case 'PullRequestReviewCommentEvent': {
                path += 'comment';
                break;
            }
            case 'ForkEvent': {
                path += 'repo-forked';
                break;
            }
            case 'GollumEvent': {
                path += 'book';
                break;
            }
            case 'IssuesEvent': {
                switch (action) {
                    default: {
                        path += 'issue-opened';
                        break;
                    }
                    case 'reopened': {
                        path += 'issue-reopened';
                        break;
                    }
                    case 'closed': {
                        path += 'issue-closed';
                        break;
                    }
                }
                break;
            }
            case 'PullRequestEvent': {
                switch (action) {
                    default: {
                        path += 'git-pull-request';
                        break;
                    }
                    case 'closed': {
                        path += 'circle-slash';
                        break;
                    }
                }
                break;
            }
            case 'PushEvent': {
                path += 'repo-push';
                break;
            }
            case 'WatchEvent': {
                path += 'eye';
                break;
            }
        }

        return `${path}.svg`;
    }
}
