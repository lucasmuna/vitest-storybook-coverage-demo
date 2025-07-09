mkdir -p coverage
mkdir -p coverage-outputs
mkdir -p coverage-merged
mkdir -p coverage-lcov-merged
mkdir -p .nyc_output

# GENERATE COVERAGE FOR STORIES
npx vitest --project storybook --run --coverage
cp coverage/coverage-final.json coverage-outputs/coverage-storybook.json
cp coverage/lcov.info coverage-outputs/lcov-storybook.info

# GENERATE COVERAGE FOR UNIT TESTS
npx vitest --project unit --run --coverage
cp coverage/coverage-final.json coverage-outputs/coverage-unit.json
cp coverage/lcov.info coverage-outputs/lcov-unit.info

# MERGE AND GENERATE HTML USING NYC
npx nyc merge coverage-outputs/ .nyc_output/out.json
npx nyc report --reporter=html --reporter=text --report-dir=$(pwd)/coverage-merged

# GENERATE LCOV HTML USING LCOV - YOU NEED LCOV AND GENHTML INSTALLED
# lcov -a coverage-outputs/lcov-storybook.info -a coverage-outputs/lcov-unit.info --branch-coverage -o coverage-lcov-merged/lcov-all.info
# genhtml coverage-lcov-merged/lcov-all.info --output-directory coverage-lcov-merged
