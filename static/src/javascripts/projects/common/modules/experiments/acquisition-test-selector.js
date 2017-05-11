import reduce from 'lodash/collections/reduce';
import segmentUtil from 'common/modules/experiments/segment-util';
import testCanRunChecks from 'common/modules/experiments/test-can-run-checks';
import viewLog from 'common/modules/commercial/acquisitions-view-log';
import alwaysAsk from 'common/modules/experiments/tests/contributions-epic-always-ask-strategy';
import askFourEarning from 'common/modules/experiments/tests/contributions-epic-ask-four-earning';
import acquisitionsEpicLiveBlog from 'common/modules/experiments/tests/acquisitions-epic-liveblog';
import acquisitionsEpicTestimonials from 'common/modules/experiments/tests/acquisitions-epic-testimonials';

/**
 * acquisition tests in priority order (highest to lowest)
 */
const tests = [
    acquisitionsEpicTestimonials,
    alwaysAsk,
    askFourEarning,
    acquisitionsEpicLiveBlog
];

const epicEngagementBannerTests = reduce(tests, (out, test) => {
    const testInstance = new test();
    if (testInstance.isEngagementBannerTest) {
        out.push(testInstance)
    }
    return out;
}, []);

const abTestClashData = tests.map(test => new test());

export default {

    epicEngagementBannerTests,

    abTestClashData,

    getTest() {
        const eligibleTests = tests.filter(test => {
            const t = new test();
            const forced = window.location.hash.indexOf('ab-' + t.id) > -1;
            const variant = segmentUtil.variantFor(t);

            const hasNotReachedRateLimit = variant &&
                ((viewLog.viewsInPreviousDays(variant.maxViews.days) < variant.maxViews.count &&
                        viewLog.viewsInPreviousDays(variant.maxViews.minDaysBetweenViews) === 0) ||
                    variant.isUnlimited);

            return forced || (testCanRunChecks.testCanBeRun(t) && segmentUtil.isInTest(t) && hasNotReachedRateLimit);
        });

        return eligibleTests[0] && new eligibleTests[0]();
    }
}
