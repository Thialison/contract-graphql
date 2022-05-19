#
# My Graphql Contract Testing
#

back_post:
	@echo "Installing dependencies and Running backend ....."
	@cd back-post && yarn install && yarn dev

post_ui:
	@echo "Installing dependencies and Running frontend ....."
	@cd post-ui && yarn install && yarn start

run_contract_test_consumer: 
	@echo "Contract Testing Generation ....."
	@cd post-ui && yarn test

run_contract_publish: 
	@echo "Contract Testing Publish ....."
	@cd post-ui && yarn contract:publish

run_contract_verify: 
	@echo "Contract Testing Verify ....."
	@cd back-post && yarn test

