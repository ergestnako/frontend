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
var tests = [
    acquisitionsEpicTestimonials,
    alwaysAsk,
    askFourEarning,
    acquisitionsEpicLiveBlog
];

var epicEngagementBannerTests = reduce(tests, function(out, test) {
    var testInstance = new test();
    if (testInstance.isEngagementBannerTest) {
        out.push(testInstance)
    }
    return out;
}, []);

var abTestClashData = tests.map(function(test) {
    return new test();
});

export default {

    epicEngagementBannerTests: epicEngagementBannerTests,

    abTestClashData: abTestClashData,

    getTest: function() {
        var eligibleTests = tests.filter(function(test) {
            var t = new test();
            var forced = window.location.hash.indexOf('ab-' + t.id) > -1;
            var variant = segmentUtil.variantFor(t);

            var hasNotReachedRateLimit = variant &&
                ((viewLog.viewsInPreviousDays(variant.maxViews.days) < variant.maxViews.count &&
                        viewLog.viewsInPreviousDays(variant.maxViews.minDaysBetweenViews) === 0) ||
                    variant.isUnlimited);

            return forced || (testCanRunChecks.testCanBeRun(t) && segmentUtil.isInTest(t) && hasNotReachedRateLimit);
        });

        return eligibleTests[0] && new eligibleTests[0]();
    }
}
