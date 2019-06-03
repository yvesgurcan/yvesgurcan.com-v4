const GITHUB_ICON_PATH_PREFIX = '/assets/github/';

class GitHubEvent {
    constructor(event, index) {
        this.data = event;
        this.index = index;

        this.id = event.id;
        this.title = `${this.getName()}.`;
        this.icon = this.getIcon();
        this.link = this.getLink();
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
        const {
            action,
            ref_type,
            pages,
            commits,
            issue = {},
            pull_request = {}
        } = payload;
        const { pull_request: issue_pull_request } = issue;
        const { merged_at } = pull_request;
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
                if (issue_pull_request) {
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
                const prAction = merged_at ? 'merged' : action;

                return `${prAction} a pull request`;
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
        const { action, ref_type, pull_request = {} } = payload;
        const { merged_at } = pull_request;
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
                        if (merged_at) {
                            path += 'git-merge';
                            break;
                        }

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

    getLink() {
        const { type, payload = {} } = this.data;
        const {
            action,
            ref_type,
            pull_request = {},
            issue = {},
            comment = {}
        } = payload;
        const { html_url: prUrl } = pull_request;
        const { html_url: issueUrl } = issue;
        const { html_url: commentUrl } = comment;
        switch (type) {
            default: {
                return '';
            }
            case 'IssueCommentEvent': {
                return commentUrl;
            }
            case 'IssuesEvent': {
                return issueUrl;
            }
            case 'PullRequestEvent': {
                return prUrl;
            }
        }
    }

    get linkIsSameAsRepoUrl() {
        const { type, payload = {} } = this.data;
        const { ref_type, ref, forkee = {} } = payload;
        const { html_url } = forkee;

        switch (type) {
            default: {
                return false;
            }
            case 'CreateEvent': {
                switch (ref_type) {
                    default: {
                        return false;
                    }
                    case 'branch': {
                        return `/tree/${ref}`;
                    }
                    case 'repository': {
                        return true;
                    }
                }
            }
            case 'ForkEvent': {
                return html_url;
            }
            case 'WatchEvent': {
                return true;
            }
        }
    }
}
