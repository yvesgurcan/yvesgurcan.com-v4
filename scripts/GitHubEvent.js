const GITHUB_ICON_PATH_PREFIX = '/assets/github';

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
        const { action, ref_type, pages, commits } = payload;
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
                // 'edited' and 'deleted' are not public
                return 'commented on an issue';
            }
            case 'IssuesEvent': {
                return `${action} an issue`;
            }
            // not tested below
            case 'LabelEvent': {
                return `${action} an issue label`;
            }
            case 'MilestoneEvent': {
                return `${action} a milestone`;
            }
            case 'ProjectCardEvent': {
                return `${action} a project card`;
            }
            case 'ProjectColumnEvent': {
                return `${action} a project column`;
            }
            case 'PullRequestEvent': {
                // TODO: there are some actions whose wording does not work very well like that
                return `${action} a pull request`;
            }
            case 'PullRequestReviewEvent': {
                return `${action} a review on a pull request`;
            }
            case 'PullRequestReviewCommentEvent': {
                return `${action} a comment on a pull request`;
            }
            case 'PushEvent': {
                const commitCount = commits.length;
                return `pushed ${commitCount} commit${
                    commitCount > 1 ? 's' : ''
                }`;
            }
            case 'RepositoryEvent': {
                return `${action} a repository`;
            }
            case 'StarEvent': {
                const starAction =
                    action === 'created' ? 'starred' : 'unstarred';
                return `${starAction} a repository`;
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
                return;
            }
            case 'ForkEvent': {
                path += 'repo-forked';
                return;
            }
            case 'PushEvent': {
                path += 'repo-push';
                return;
            }
        }

        return `${path}.svg`;
    }

    async getRepoUrl() {
        const result = await fetch(this.repo.apiUrl);
        if (result) {
            const data = await result.json();
            this.repo = {
                ...this.repo,
                url: data.html_url
            };
            return data.html_url;
        }

        return '';
    }
}
