#
# My Graphql Contract Testing
#

run_contract_verify: 
	@echo "Contract Testing Verify ....."
	@cd back-post && yarn test

run_contract_test_consumer: 
	@echo "Contract Testing Generation ....."
	@cd post-ui && yarn

run_contract_publish: 
	@echo "Contract Testing Publish ....."
	@cd post-ui && yarn

