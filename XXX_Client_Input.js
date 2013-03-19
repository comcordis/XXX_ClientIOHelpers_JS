
var XXX_Client_Input =
{
	asynchronousCallbackResponses: {},
	
	resetAsynchronousActionCallbackHelpers: function ()
	{
		this.asynchronousCallbackResponses = {};
	},
	
	areSelectedFilesDifferent: function (selectedFilesA, selectedFilesB)
	{
		var result = false;
		
		if (XXX_Array.getFirstLevelItemTotal(selectedFilesA) != XXX_Array.getFirstLevelItemTotal(selectedFilesB))
		{
			result = true;
		}
		else
		{
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(selectedFilesA); i < iEnd; ++i)
			{
				var foundSelectedFile = false;
				
				for (j = 0, jEnd = XXX_Array.getFirstLevelItemTotal(selectedFilesB); j < jEnd; ++j)
				{
					if (selectedFilesA[i].file == selectedFilesB[j].file)						
					{
						foundSelectedFile = true;
						
						break;
					}
				}
				
				if (!foundSelectedFile)
				{
					result = true;
					
					break;
				}
			}
		}
		
		return result;
	},
	
	areSelectedOptionValuesDifferent: function (selectedOptionValuesA, selectedOptionValuesB)
	{
		var result = false;
		
		if (XXX_Array.getFirstLevelItemTotal(selectedOptionValuesA) != XXX_Array.getFirstLevelItemTotal(selectedOptionValuesB))
		{
			result = true;
		}
		else
		{
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(selectedOptionValuesA); i < iEnd; ++i)
			{
				if (!XXX_Array.hasValue(selectedOptionValuesB, selectedOptionValuesA[i]))
				{
					result = true;
					
					break;
				}
			}
		}
		
		return result;
	},
	
	areDatesDifferent: function (dateA, dateB)
	{
		var result = false;
		
		if (dateA.year != dateB.year)
		{
			result = true;
		}
		else
		{
			if (dateA.month != dateB.month)
			{
				result = true;
			}
			else
			{
				if (dateA.date != dateB.date)
				{
					result = true;
				}
			}
		}
		
		return result;
	},
	
	// file
	
		validateFileMIMEType: function (validFileMIMETypes, fileMIMEType)
		{
			var result = false;
			
			fileMIMEType = XXX_String.trim(fileMIMEType);
			
			var fileMIMETypeParts = XXX_String.splitToArray(fileMIMEType, '/');
			
			if (XXX_Array.getFirstLevelItemTotal(validFileMIMETypes) > 0)
			{
				for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(validFileMIMETypes); i < iEnd; ++i)
				{
					var validFileMIMEType = validFileMIMETypes[i];
					
					if (validFileMIMEType == '*/*')
					{
						result = true;
					}
					else
					{
						var validFileMIMETypeParts = XXX_String.splitToArray(validFileMIMEType, '/');
						
						if (fileMIMETypeParts[0] == validFileMIMETypeParts[0])
						{
							if (validFileMIMETypeParts[1] == '*')
							{
								result = true;
							}
							else
							{
								if (fileMIMETypeParts[1] == validFileMIMETypeParts[1])
								{
									result = true;
								}
							}
						}
					}
					
					// No need to look further
					if (result)
					{
						break;
					}
				}
			}
			else
			{
				// No restriction in place, don't allow anything
				result = false;
			}
			
			return result;
		},
		
		validateFileExtension: function (validFileExtensions, fileExtension)
		{
			var result = false;
			
			fileExtension = XXX_String.trim(fileExtension);
			
			if (XXX_Array.getFirstLevelItemTotal(validFileExtensions) > 0)
			{
				for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(validFileExtensions); i < iEnd; ++i)
				{
					var validFileExtension = validFileExtensions[i];
					
					if (validFileExtension == '*')
					{
						result = true;
					}
					else
					{
						if (fileExtension == validFileExtension)
						{
							result = true;
						}
					}
					
					// No need to look further
					if (result)
					{
						break;
					}
				}
			}
			else
			{
				// No restriction in place, don't allow anything
				result = false;
			}
			
			return result;
		},
		
		validateMinimumFileSize: function (minimumFileSize, fileSize)
		{
			var result = false;
			
			if (minimumFileSize)
			{
				if (fileSize >= minimumFileSize)
				{
					result = true;
				}
			}
			else
			{
				result = true;
			}
			
			return result;
		},
		
		validateMaximumFileSize: function (maximumFileSize, fileSize)
		{
			var result = false;
			
			if (maximumFileSize)
			{
				if (fileSize <= maximumFileSize)
				{
					result = true;
				}
			}
			else
			{
				result = true;
			}
			
			return result;
		},
		
		validateMaximumFileTotal: function (maximumFileTotal, fileTotal)
		{
			var result = false;
			
			if (maximumFileTotal)
			{
				if (fileTotal <= maximumFileTotal)
				{
					result = true;
				}
			}
			else
			{
				result = true;
			}
			
			return result;
		},
		
		validateMaximumFileSizeTotal: function (maximumFileSizeTotal, fileSizeTotal)
		{
			var result = false;
			
			if (maximumFileSizeTotal)
			{
				if (fileSizeTotal <= maximumFileSizeTotal)
				{
					result = true;
				}
			}
			else
			{
				result = true;
			}
			
			return result;
		},
		
		
		validateFreeAccountStorageSpace: function (freeAccountStorageSpace, fileSizeTotal)
		{
			var result = false;
			
			if (freeAccountStorageSpace > 0)
			{
				if (fileSizeTotal <= freeAccountStorageSpace)
				{
					result = true;
				}
			}
			else
			{
				result = true;
			}
			
			return result;
		},
		
		isAllowedEventTrigger: function (eventTrigger, matchEventTrigger, doNotMatchEventTrigger)
		{
			var result = false;
			
			if (!eventTrigger)
			{
				result = true;
			}
			else
			{
				var matchEventTriggerState = false;
				
				if (!matchEventTrigger)
				{
					matchEventTriggerState = true;
				}			
				else if (XXX_Type.isArray(matchEventTrigger))
				{
					if (XXX_Array.hasValue(matchEventTrigger, eventTrigger))
					{
						matchEventTriggerState = true;
					}
				}
				else if (eventTrigger == matchEventTrigger)
				{
					matchEventTriggerState = true;
				}
				
				var doNotMatchEventTriggerState = false;
				
				if (!doNotMatchEventTrigger)
				{
					doNotMatchEventTriggerState = true;
				}			
				else if (XXX_Type.isArray(doNotMatchEventTrigger))
				{
					if (!XXX_Array.hasValue(doNotMatchEventTrigger, eventTrigger))
					{
						doNotMatchEventTriggerState = true;
					}
				}
				else if (eventTrigger != doNotMatchEventTrigger)
				{
					doNotMatchEventTriggerState = true;
				}
				
				if (matchEventTriggerState && doNotMatchEventTriggerState)
				{
					result = true;
				}
			}
			
			return result;
		},
		
	// value
		
		operateOnValue: function (value, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				operated: false,
				value: value,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
						
			switch (action)
			{
				case 'removePattern':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							pattern: parameters,
							patternModifier: ''
						};
					}
					
					if (parameters.pattern)
					{
						var temp = XXX_String_Pattern.replaceReturnInformation(value, parameters.pattern, parameters.patternModifiers, '');
						
						if (temp && temp.replaced)
						{
							result.operated = true;
							result.value = temp.newValue;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'removePattern');
							}
						}
					}
					break;
				case 'replacePattern':
					if (parameters.pattern && parameters.replacement)
					{
						var temp = XXX_String_Pattern.replaceReturnInformation(value, parameters.pattern, parameters.patternModifiers, parameters.replacement);
						
						if (temp && temp.replaced)
						{
							result.operated = true;
							result.value = temp.newValue;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'replacePattern');
							}
						}
					}
					break;
				case 'string':
					var valueString = XXX_Type.makeString(value);
					
					if (value !== valueString)
					{
						result.operated = true;
						result.value = valueString;
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'string');
						}
					}
					break;
				case 'maximumCharacterLength':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumCharacterLength: parameters
						};
					}
					
					var valueCharacterLength = XXX_String.getCharacterLength(value);
					
					if (parameters.maximumCharacterLength && valueCharacterLength > parameters.maximumCharacterLength)
					{
						var difference = valueCharacterLength - parameters.maximumCharacterLength;
						
						var newValue = XXX_String.getPart(value, 0, parameters.maximumCharacterLength);
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.maximumCharacterLength = parameters.maximumCharacterLength;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'maximumCharacterLength');
						}
					}
					break;
				case 'number':
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (value != valueNumber)
					{
						result.operated = true;
						result.value = valueNumber;
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'number');
						}
					}
					break;
				case 'minimumNumber':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumNumber: parameters
						};
					}
					
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (parameters.minimumNumber && valueNumber < parameters.minimumNumber)
					{
						var difference = parameters.minimumNumber - valueNumber;
						
						var newValue = parameters.minimumNumber;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.minimumNumber = parameters.minimumNumber;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'minimumNumber');
						}
					}
					break;
				case 'maximumNumber':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumNumber: parameters
						};
					}
					
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (parameters.maximumNumber && valueNumber > parameters.maximumNumber)
					{
						var difference = valueNumber - parameters.maximumNumber;
						
						var newValue = parameters.maximumNumber;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.maximumNumber = parameters.maximumNumber;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'maximumNumber');
						}
					}
					break;
				case 'float':
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (value != valueFloat)
					{
						result.operated = true;
						result.value = valueFloat;
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'float');
						}
					}
					break;
				case 'minimumFloat':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumFloat: parameters
						};
					}
					
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (parameters.minimumFloat && valueFloat < parameters.minimumFloat)
					{
						var difference = parameters.minimumFloat - valueFloat;
						
						var newValue = parameters.minimumFloat;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.minimumFloat = parameters.minimumFloat;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'minimumFloat');
						}
					}
					break;
				case 'maximumFloat':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumFloat: parameters
						};
					}
					
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (parameters.maximumFloat && valueFloat > parameters.maximumFloat)
					{
						var difference = valueFloat - parameters.maximumFloat;
						
						var newValue = parameters.maximumFloat;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.maximumFloat = parameters.maximumFloat;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'maximumFloat');
						}
					}
					break;
				case 'integer':
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (value != valueInteger)
					{
						result.operated = true;
						result.value = valueInteger;
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'integer');
						}
					}
					break;
				case 'minimumInteger':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumInteger: parameters
						};
					}
										
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (parameters.minimumInteger && valueInteger < parameters.minimumInteger)
					{
						var difference = parameters.minimumInteger - valueInteger;
						
						var newValue = parameters.minimumInteger;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.minimumInteger = parameters.minimumInteger;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'minimumInteger');
						}
					}
					break;
				case 'maximumInteger':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumInteger: parameters
						};
					}
						
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (parameters.maximumInteger && valueInteger > parameters.maximumInteger)
					{
						var difference = value - parameters.maximumInteger;
						
						var newValue = parameters.maximumInteger;
						
						result.operated = true;
						result.value = newValue;
						
						variables.difference = difference;
						variables.maximumInteger = parameters.maximumInteger;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'maximumInteger');
						}
					}
					break;
				case 'round':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							decimals: parameters
						};
					}
						
					var valueNumber = XXX_Type.makeNumber(value);
					
					var decimals = 0;
					
					if (parameters.decimals)
					{
						decimals = parameters.decimals;
					}
					
					var valueNumberRound = XXX_Number.round(valueNumber, decimals);
					
					if (value != valueNumberRound)
					{
						var difference = valueNumber - valueNumberRound;
						
						if (valueNumber < valueNumberRound)
						{
							difference = valueNumberRound - valueNumber;
						}
						
						result.operated = true;
						result.value = valueNumberRound;
						
						variables.difference = difference;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'round');
						}
					}
					break;
				case 'floor':
					var valueNumber = XXX_Type.makeNumber(value);
					
					var valueNumberFloor = XXX_Number.floor(valueNumber);
					
					if (value != valueNumberFloor)
					{
						var difference = valueNumber - valueNumberFloor;
						
						if (valueNumber < valueNumberFloor)
						{
							difference = valueNumberFloor - valueNumber;
						}
						
						result.operated = true;
						result.value = valueNumberFloor;
						
						variables.difference = difference;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'floor');
						}
					}
					break;
				case 'ceil':
					var valueNumber = XXX_Type.makeNumber(value);
					
					var valueNumberCeil = XXX_Number.ceil(valueNumber);
					
					if (value != valueNumberCeil)
					{
						var difference = valueNumber - valueNumberCeil;
						
						if (valueNumber < valueNumberCeil)
						{
							difference = valueNumberCeil - valueNumber;
						}
						
						result.operated = true;
						result.value = valueNumberCeil;
						
						variables.difference = difference;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'operation', 'ceil');
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		validateValue: function (value, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				validated: true,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'required':
					if (XXX_Type.isEmpty(value))
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'required');
						}
					}
					break;
				case 'string':
					var valueString = XXX_Type.makeString(value);
					
					if (valueString != value)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'string');
						}
					}
					break;
				case 'minimumByteSize':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumByteSize: parameters
						};
					}
				
					var valueByteSize = XXX_String.getByteSize(value);
					
					if (parameters.minimumByteSize && valueByteSize < parameters.minimumByteSize)
					{
						var difference = parameters.minimumByteSize - valueByteSize;
						
						result.validated = false;					
						variables.difference = difference;
						variables.minimumByteSize = parameters.minimumByteSize;				
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumByteSize');
						}
					}	
					break;
				case 'maximumByteSize':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumByteSize: parameters
						};
					}
				
					var valueByteSize = XXX_String.getByteSize(value);
					 
					if (parameters.maximumByteSize && valueByteSize > parameters.maximumByteSize)
					{
						var difference =  valueByteSize - parameters.maximumByteSize;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumByteSize = parameters.maximumByteSize;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
												
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumByteSize');
						}
					}
					break;
				case 'minimumCharacterLength':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumCharacterLength: parameters
						};
					}
				
					var valueCharacterLength = XXX_String.getCharacterLength(value);
					
					if (parameters.minimumCharacterLength && valueCharacterLength < parameters.minimumCharacterLength)
					{
						var difference = parameters.minimumCharacterLength - valueCharacterLength;
						
						result.validated = false;					
						variables.difference = difference;	
						variables.minimumCharacterLength = parameters.minimumCharacterLength;				
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumCharacterLength');
						}
					}
					break;
				case 'maximumCharacterLength':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumCharacterLength: parameters
						};
					}
				
					var valueCharacterLength = XXX_String.getCharacterLength(value);
					
					if (parameters.maximumCharacterLength && valueCharacterLength > parameters.maximumCharacterLength)
					{
						var difference =  valueCharacterLength - parameters.maximumCharacterLength;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumCharacterLength = parameters.maximumCharacterLength;				
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumCharacterLength');
						}
					}
					break;
				case 'minimumWordCount':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumWordCount: parameters
						};
					}
				
					var valueWordCount = XXX_String.getWordCount(value);
					
					if (parameters.minimumWordCount && valueWordCount < parameters.minimumWordCount)
					{
						var difference = parameters.minimumWordCount - valueWordCount;
						
						result.validated = false;					
						variables.difference = difference;
						variables.minimumWordCount = parameters.minimumWordCount;				
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumWordCount');
						}
					}
					break;
				case 'maximumWordCount':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumWordCount: parameters
						};
					}
				
					var valueWordCount = XXX_String.getWordCount(value);
					
					if (parameters.maximumWordCount && valueWordCount > parameters.maximumWordCount)
					{
						var difference =  valueWordCount - parameters.maximumWordCount;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumWordCount = parameters.maximumWordCount;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumWordCount');
						}
					}
					break;
				case 'number':
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (valueNumber != value)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'number');
						}
					}
					break;
				case 'minimumNumber':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumNumber: parameters
						};
					}
				
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (parameters.minimumNumber && valueNumber < parameters.minimumNumber)
					{
						var difference = parameters.minimumNumber - valueNumber;
						
						result.validated = false;					
						variables.difference = difference;
						variables.minimumNumber = parameters.minimumNumber;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumNumber');
						}
					}
					break;
				case 'maximumNumber':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumNumber: parameters
						};
					}
				
					var valueNumber = XXX_Type.makeNumber(value);
					
					if (parameters.maximumNumber && valueNumber > parameters.maximumNumber)
					{
						var difference = valueNumber - parameters.maximumNumber;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumNumber = parameters.maximumNumber;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumNumber');
						}
					}
					break;
				case 'float':
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (valueFloat != value)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'float');
						}
					}
					break;
				case 'minimumFloat':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumFloat: parameters
						};
					}
				
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (parameters.minimumFloat && valueFloat < parameters.minimumFloat)
					{
						var difference = parameters.minimumFloat - valueFloat;
						
						result.validated = false;					
						variables.difference = difference;
						variables.minimumFloat = parameters.minimumFloat;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumFloat');
						}
					}
					break;
				case 'maximumFloat':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumFloat: parameters
						};
					}
				
					var valueFloat = XXX_Type.makeFloat(value);
					
					if (parameters.maximumFloat && valueFloat > parameters.maximumFloat)
					{
						var difference = valueFloat - parameters.maximumFloat;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumFloat = parameters.maximumFloat;
						feedbackMessageGrammaticalNumberFormQuantity = XXX_Number.round(difference);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumFloat');
						}
					}
					break;
				case 'integer':
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (valueInteger != value)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'integer');
						}
					}
					break;
				case 'minimumInteger':
									
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumInteger: parameters
						};
					}
				
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (parameters.minimumInteger && valueInteger < parameters.minimumInteger)
					{
						var difference = parameters.minimumInteger - valueInteger;
						
						result.validated = false;					
						variables.difference = difference;
						variables.minimumInteger = parameters.minimumInteger;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumInteger');
						}
					}
					break;
				case 'maximumInteger':
							
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumInteger: parameters
						};
					}
				
					var valueInteger = XXX_Type.makeInteger(value);
					
					if (valueInteger > parameters.maximumInteger)
					{
						var difference = valueInteger - parameters.maximumInteger;
						
						result.validated = false;					
						variables.difference = difference;
						variables.maximumInteger = parameters.maximumInteger;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'maximumInteger');
						}
					}
					break;
				case 'minimumPassSecurityRating':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumPassSecurityRating: parameters
						};
					}
				
					if (parameters.minimumPassSecurityRating && parameters.minimumPassSecurityRating > 0)
					{
						var passSecurityRating = XXX_String.getPassSecurityRating(value);
						
						if (passSecurityRating < parameters.minimumPassSecurityRating)
						{
							var difference = parameters.minimumPassSecurityRating - passSecurityRating;
							
							result.validated = false;
							variables.difference = difference;
							variables.passSecurityRating = passSecurityRating;
							variables.minimumPassSecurityRating = parameters.minimumPassSecurityRating;
							feedbackMessageGrammaticalNumberFormQuantity = difference;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'minimumPassSecurityRating');
							}
						}
					}
					break;
				case 'matchValue':	
				case 'matchValues':	
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
					
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						if (XXX_Type.isArray(parameters.value))
						{
							if (!XXX_Array.hasValue(parameters.value, value))
							{
								result.validated = false;
								
								variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'matchValue');
								}
							}
						}
						else
						{
							if (value != parameters.value)
							{
								result.validated = false;
								
								variables.value = parameters.value;
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'matchValue');
								}
							}
						}
					}
					break;
				case 'doNotMatchValue':	
				case 'doNotMatchValues':	
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
					
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						if (XXX_Type.isArray(parameters.value))
						{
							if (XXX_Array.hasValue(parameters.value, value))
							{
								result.validated = false;
								
								variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'doNotMatchValue');
								}
							}
						}
						else
						{
							if (value == parameters.value)
							{
								result.validated = false;
								
								variables.value = parameters.value;
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'doNotMatchValue');
								}
							}
						}
					}
					break;
				case 'matchPattern':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							pattern: parameters,
							patternModifiers: ''
						};
					}
					
					if (!XXX_String_Pattern.hasMatch(value, parameters.pattern, parameters.patternModifiers))
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'matchPattern');
						}
					}
					break;
				case 'doNotMatchPattern':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							pattern: parameters,
							patternModifiers: ''
						};
					}
					
					if (parameters.pattern && XXX_String_Pattern.hasMatch(value, parameters.pattern, parameters.patternModifiers))
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'doNotMatchPattern');
						}
					}
					break;
				case 'ajaxCallback':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							uri: parameters,
							matchEventTrigger: 'blur'
						};
					}
					
					// Only on blur
					if (parameters.inputInstance && parameters.asynchronousCallbackResponseID && parameters.uri != '')
					{
						var asynchronousCallbackResponseID = parameters.asynchronousCallbackResponseID;
						
						// If no array yet
						if (!XXX_Type.isArray(this.asynchronousCallbackResponses[asynchronousCallbackResponseID]))
						{
							this.asynchronousCallbackResponses[asynchronousCallbackResponseID] = [];
						}
						
						// Check for existing
						var foundExisting = false;
						
						for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(this.asynchronousCallbackResponses[asynchronousCallbackResponseID]); i < iEnd; ++i)
						{
							if (this.asynchronousCallbackResponses[asynchronousCallbackResponseID][i].value == value)
							{
								result.validated = this.asynchronousCallbackResponses[asynchronousCallbackResponseID][i].validated;
								
								foundExisting = true;
								
								break;
							}
						}
						
						if (!foundExisting)
						{
							if (this.isAllowedEventTrigger(eventTrigger, parameters.matchEventTrigger, parameters.doNotMatchEventTrigger))
							{
								var valueCharacterLength = XXX_String.getCharacterLength(value);
								
								if (!parameters.minimumCharacterLength || valueCharacterLength >= parameters.minimumCharacterLength)
								{							
									var XXX_Component_Input_instance = parameters.inputInstance;
																		
									var XXX_callback = function (jsonResponse)
									{
										if (jsonResponse.value)
										{
											XXX_Client_Input.asynchronousCallbackResponses[asynchronousCallbackResponseID].push(jsonResponse);
											
											XXX_Component_Input_instance.processActions('ajaxCallbackResponse');
											
											if (XXX_Component_Input_instance.elements.form)
											{
												XXX_Component_Input_instance.elements.form.potentialInputChange();
											}
										}
									};
																		
									XXX_HTTP_Browser_Request_Asynchronous.queueRequest(asynchronousCallbackResponseID, parameters.uri, [{key: 'value', value: value}], XXX_callback, 'json', true, 'uri');
								}
							}
						}
					}
					break;
				case 'synchronousCallback':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							functionName: parameters
						};
					}
					
					if (parameters.context && parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, parameters.context, value);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'synchronousCallback');
							}
						}
					}
					else if (parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, false, value);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'validation', 'synchronousCallback');
							}
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{	
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		
		informAboutValue: function (value, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				informed: false,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'byteSize':										
					var valueByteSize = XXX_String.getByteSize(value);
					
					if (valueByteSize > 0)
					{
						result.informed = true;
						
						variables.byteSize = valueByteSize;					
						feedbackMessageGrammaticalNumberFormQuantity = valueByteSize;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'byteSize');
						}
					}
					break;
				case 'characterLength':
					var valueCharacterLength = XXX_String.getCharacterLength(value);
					
					if (valueCharacterLength > 0)
					{
						result.informed = true;
						
						variables.characterLength = valueCharacterLength;					
						feedbackMessageGrammaticalNumberFormQuantity = valueCharacterLength;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'characterLength');
						}
					}
					break;
				case 'wordCount':
					var valueWordCount = XXX_String.getWordCount(value);
					
					if (valueWordCount > 0)
					{
						result.informed = true;
						
						variables.wordCount = valueWordCount;					
						feedbackMessageGrammaticalNumberFormQuantity = valueWordCount;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'wordCount');
						}
					}
					break;
				case 'suffixCharacterPeek':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							peekCharacterLength: parameters,
							matchEventTrigger: 'valueChange'
						};
					}
					
					if (this.isAllowedEventTrigger(eventTrigger, parameters.matchEventTrigger, parameters.doNotMatchEventTrigger))
					{
						var valueCharacterLength = XXX_String.getCharacterLength(value);
						
						if (!parameters.minimumCharacterLength || valueCharacterLength >= parameters.minimumCharacterLength)
						{
							var peekCharacterLength = XXX_Number.lowest(valueCharacterLength, parameters.peekCharacterLength);
							
							if (peekCharacterLength > 0)
							{
								result.informed = true;
								
								var maskedPartCharacterLength = valueCharacterLength - peekCharacterLength;
								
								var previewPart = XXX_String.getPart(value, -peekCharacterLength);
								
								var temp = '';
								
								for (var i = 0, iEnd = maskedPartCharacterLength; i< iEnd; ++i)
								{
									temp += '*';
								}
								
								temp += previewPart;
								
								variables.suffixCharacterPeek = temp;
								variables.characterLength = valueCharacterLength;
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'suffixCharacterPeek');
								}
							}
						}
					}
					break;
				case 'passSecurityAdvice':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumPassSecurityRating: parameters,
							matchEventTrigger: 'valueChange'
						};
					}
					
					var passSecurityRating = XXX_String.getPassSecurityRating(value);
					
					if (this.isAllowedEventTrigger(eventTrigger, parameters.matchEventTrigger, parameters.doNotMatchEventTrigger))
					{
						if (!parameters.minimumPassSecurityRating || passSecurityRating < parameters.minimumPassSecurityRating)
						{
							if (!result.informed)
							{
								var hasDigit = XXX_String_Pattern.hasMatch(value, '[0-9]', '');
								
								if (!hasDigit)
								{
									result.informed = true;
									
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'passSecurityAdvice', 'digit');
								}
							}
							
							if (!result.informed)
							{
								var hasLowerCaseLetter = XXX_String_Pattern.hasMatch(value, '[a-z]', '');
								
								if (!hasLowerCaseLetter)
								{
									result.informed = true;
									
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'passSecurityAdvice', 'lowerCaseLetter');
								}
							}
							
							if (!result.informed)
							{
								var hasUpperCaseLetter = XXX_String_Pattern.hasMatch(value, '[A-Z]', '');
								
								if (!hasUpperCaseLetter)
								{
									result.informed = true;
									
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'passSecurityAdvice', 'upperCaseLetter');
								}
							}
							
							if (!result.informed)
							{
								var hasSpecialCharacter = XXX_String_Pattern.hasMatch(value, '\\W', '');
								
								if (!hasSpecialCharacter)
								{
									result.informed = true;
									
									texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'passSecurityAdvice', 'specialCharacter');
								}
							}
						}
					}
					break;
				case 'passSecurityRating':
										
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumCharacterLength: parameters,
							matchEventTrigger: 'valueChange'
						};
					}
					
					var valueCharacterLength = XXX_String.getCharacterLength(value);
					
					if (this.isAllowedEventTrigger(eventTrigger, parameters.matchEventTrigger, parameters.doNotMatchEventTrigger))
					{
						if (!parameters.minimumCharacterLength || valueCharacterLength >= parameters.minimumCharacterLength)
						{
							var passSecurityRating = XXX_String.getPassSecurityRating(value);
							
							result.informed = true;
							
							variables.passSecurityRating = passSecurityRating;					
							feedbackMessageGrammaticalNumberFormQuantity = passSecurityRating;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'value', 'information', 'passSecurityRating');
							}
						}
					}
					
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
	// (single) option
		
		operateOnOption: function (option, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				operated: false,
				option: option,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
						
			switch (action)
			{
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		validateOption: function (option, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				validated: true,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'required':
					if (!option.selected)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'required');
						}
					}
					break;
				case 'matchValue':	
				case 'matchValues':					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
								
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						if (XXX_Type.isArray(parameters.value))
						{
							if (!option.selected || !XXX_Array.hasValue(parameters.value, option.value))
							{
								result.validated = false;
								
								variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'matchValue');
								}
							}
						}
						else
						{
							if (!option.selected || option.value != parameters.value)
							{
								result.validated = false;
								
								variables.value = parameters.value;
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'matchValue');
								}
							}
						}
					}
					break;
				case 'doNotMatchValue':
				case 'doNotMatchValues':
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
								
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						if (XXX_Type.isArray(parameters.value))
						{
							if (option.selected && XXX_Array.hasValue(parameters.value, option.value))
							{
								result.validated = false;
								
								variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'doNotMatchValue');
								}
							}
						}
						else
						{
							if (option.selected && option.value == parameters.value)
							{
								result.validated = false;
								
								variables.value = parameters.value;
								
								if (useDefaultTexts)
								{
									texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'doNotMatchValue');
								}
							}
						}
					}
					break;
				case 'synchronousCallback':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							functionName: parameters
						};
					}
					
					if (parameters.context && parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, parameters.context, option);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'synchronousCallback');
							}
						}
					}
					else if (parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, false, option);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'validation', 'synchronousCallback');
							}
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		informAboutOption: function (option, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				informed: false,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'selected':
					if (option.selected)
					{
						result.informed = true;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'information', 'selected');
						}
					}
					break;
				case 'notSelected':
					if (!option.selected)
					{
						result.informed = true;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'information', 'notSelected');
						}
					}
					break;
				case 'selectedTotal':
					variables.selectedTotal = 0;
					
					if (option.selected)
					{
						variables.selectedTotal = 1;
					}
					
					result.informed = true;
					
					if (useDefaultTexts)
					{
						texts = XXX_I18n_Translation.get('input', 'actions', 'option', 'information', 'selectedTotal');
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
	// (multiple) options
		
		operateOnOptions: function (selectedOptionValues, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				operated: false,
				selectedOptionValues: selectedOptionValues,
				deselectedOptionValues: [],
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
						
			switch (action)
			{
				case 'maximumSelected':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumSelected: parameters
						};
					}
					
					var selectedTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
					if (parameters.maximumSelected && selectedTotal > parameters.maximumSelected)
					{
						var difference = selectedTotal - parameters.maximumSelected;
					
						var deselectedOptionValues = [];
						
						for (var i = parameters.maximumSelected, iEnd = selectedTotal; i < iEnd; ++i)
						{
							deselectedOptionValues.push(selectedOptionValues[i]);
						}
						
						result.operated = true;
						result.deselectedOptionValues = deselectedOptionValues;
						
						variables.difference = difference;
						variables.maximumSelected = parameters.maximumSelected;
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'operation', 'maximumSelected');
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		validateOptions: function (selectedOptionValues, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				validated: true,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'required':
					var selectedTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
					if (selectedTotal == 0)
					{
						result.validated = false;
						
						variables.difference = 1;		
						feedbackMessageGrammaticalNumberFormQuantity = 1;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'required');
						}
					}
					break;
				case 'minimumSelected':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							minimumSelected: parameters
						};
					}
					
					var selectedTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
					if (parameters.minimumSelected && selectedTotal < parameters.minimumSelected)
					{
						var difference = parameters.minimumSelected - selectedTotal;
						
						result.validated = false;
						
						variables.difference = difference;
						variables.minimumSelected = parameters.minimumSelected;					
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'minimumSelected');
						}
					}
					break;
				case 'maximumSelected':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							maximumSelected: parameters
						};
					}
					
					var selectedTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
					if (parameters.maximumSelected && selectedTotal > parameters.maximumSelected)
					{
						var difference = selectedTotal - parameters.maximumSelected;
						
						result.validated = false;
						
						variables.difference = difference;
						variables.maximumSelected = parameters.maximumSelected;						
						feedbackMessageGrammaticalNumberFormQuantity = difference;
						
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'maximumSelected');
						}
					}
					break;
					
				case 'matchValue':
				case 'matchValues':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
								
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						selectedOptionValueTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
						if (selectedOptionValueTotal == 0)
						{
							result.validated = false;
						}
						else
						{						
							if (XXX_Type.isArray(parameters.value))
							{
								for (i = 0, iEnd = selectedOptionValueTotal; i < iEnd; ++i)
								{
									if (!XXX_Array.hasValue(parameters.value, selectedOptionValues[i]))
									{
										result.validated = false;
										
										variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
										if (useDefaultTexts)
										{
											texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'matchValue');
										}
										
										break;
									}
								}
							}
							else
							{
								for (i = 0, iEnd = selectedOptionValueTotal; i < iEnd; ++i)
								{
									if (selectedOptionValues[i] != parameters.value)
									{
										result.validated = false;
										
										variables.value = parameters.value;
								
										if (useDefaultTexts)
										{
											texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'matchValue');
										}
										
										break;
									}
								}
							}
						}
					}
					break;
				case 'doNotMatchValue':
				case 'doNotMatchValues':
					
					if (!XXX_Type.isArray(parameters))
					{
						parameters =
						{
							value: parameters
						};
					}
					
					if (XXX_Array.hasKey(parameters, 'values'))
					{
						parameters.value = parameters.values;
					}
								
					if (XXX_Array.hasKey(parameters, 'value'))
					{
						selectedOptionValueTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
					
						if (selectedOptionValueTotal == 0)
						{
							result.validated = false;
						}
						else
						{						
							if (XXX_Type.isArray(parameters.value))
							{
								for (i = 0, iEnd = selectedOptionValueTotal; i < iEnd; ++i)
								{
									if (XXX_Array.hasValue(parameters.value, selectedOptionValues[i]))
									{
										result.validated = false;
										
										variables.value = XXX_Array.joinValuesToString(parameters.value, ', ');
								
										if (useDefaultTexts)
										{
											texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'doNotMatchValue');
										}
										
										break;
									}
								}
							}
							else
							{
								for (i = 0, iEnd = selectedOptionValueTotal; i < iEnd; ++i)
								{
									if (selectedOptionValues[i] == parameters.value)
									{
										result.validated = false;
										
										variables.value = parameters.value;
								
										if (useDefaultTexts)
										{
											texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'doNotMatchValue');
										}
										
										break;
									}
								}
							}
						}
					}
					break;
					
				case 'synchronousCallback':
				
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							functionName: parameters
						};
					}
					
					if (parameters.context && parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, parameters.context, selectedOptionValues);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'synchronousCallback');
							}
						}
					}
					else if (parameters.functionName)
					{
						var temp = XXX.callFunction(parameters.functionName, false, selectedOptionValues);
						
						if (!temp)
						{
							result.validated = false;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'validation', 'synchronousCallback');
							}
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		informAboutOptions: function (selectedOptionValues, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				informed: false,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			switch (action)
			{
				case 'selectedTotal':
					var selectedTotal = XXX_Array.getFirstLevelItemTotal(selectedOptionValues);
										
					variables.selectedTotal = selectedTotal;
					result.informed = true;
					
					if (useDefaultTexts)
					{
						texts = XXX_I18n_Translation.get('input', 'actions', 'options', 'information', 'selectedTotal');
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
		
		
	// date
		
		validateDate: function (date, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				validated: true,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			var existingDate = XXX_TimestampHelpers.isExistingDate(date.year, date.month, date.date);
			
			switch (action)
			{
				case 'exists':
					if (!existingDate)
					{
						result.validated = false;
						
						variables.daysInMonth = XXX_TimestampHelpers.getDayTotalInMonth(date.year, date.month);
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'validation', 'exists');
						}
					}
					break;
				case 'past':
					var timestamp = 0;
					var now = XXX_TimestampHelpers.getCurrentSecondTimestamp();
					
					if (existingDate)
					{
						timestamp = new XXX_Timestamp({year: date.year, month: date.month, date: date.date, hour: 0, minute: 0, second: 0});
						timestamp = timestamp.get();
					}
					
					if (!existingDate || timestamp >= now)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'validation', 'past');
						}
					}					
					break;					
				case 'future':
					var timestamp = 0;
					var now = XXX_TimestampHelpers.getCurrentSecondTimestamp();
					
					if (existingDate)
					{
						timestamp = new XXX_Timestamp({year: date.year, month: date.month, date: date.date, hour: 0, minute: 0, second: 0});
						timestamp = timestamp.get();
					}
					
					if (!existingDate || timestamp <= now)
					{
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'validation', 'future');
						}
					}					
					break;
				case 'minimumDateOfBirthYearAge':
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							minimumDateOfBirthYearAge: parameters
						};
					}
					
					var dateOfBirthYearAge = 0;
					
					if (existingDate)
					{
						dateOfBirthYearAge = XXX_TimestampHelpers.getDateOfBirthYearAge(date.year, date.month, date.date);;
					}
					
					if (!existingDate || (parameters.minimumDateOfBirthYearAge && dateOfBirthYearAge < parameters.minimumDateOfBirthYearAge))
					{
						variables.minimumDateOfBirthYearAge = parameters.minimumDateOfBirthYearAge;
						variables.dateOfBirthYearAge = dateOfBirthYearAge;
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'validation', 'minimumDateOfBirthYearAge');
						}
					}
					
					break;
				case 'maximumDateOfBirthYearAge':
					if (!XXX_Type.isArray(parameters))
					{
						parameters =  
						{
							maximumDateOfBirthYearAge: parameters
						};
					}
					
					var dateOfBirthYearAge = 0;
					
					if (existingDate)
					{
						dateOfBirthYearAge = XXX_TimestampHelpers.getDateOfBirthYearAge(date.year, date.month, date.date);
					}
					
					if (!existingDate || (parameters.maximumDateOfBirthYearAge && dateOfBirthYearAge > parameters.maximumDateOfBirthYearAge))
					{
						variables.maximumDateOfBirthYearAge = parameters.maximumDateOfBirthYearAge;
						variables.dateOfBirthYearAge = dateOfBirthYearAge;
						result.validated = false;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'validation', 'maximumDateOfBirthYearAge');
						}
					}
					
					break;
				case 'minimumDate':
					if (!existingDate || date.year < parameters.minimumDate.year || (date.year == parameters.minimumDate.year && date.month < parameters.minimumDate.month) || (date.year == parameters.minimumDate.year && date.month == parameters.minimumDate.month  && date.date < parameters.minimumDate.date))
					{
						result.validated = false;
					}
					break;
				case 'maximumDate':
					if (!existingDate || date.year > parameters.maximumDate.year || (date.year == parameters.maximumDate.year && date.month > parameters.maximumDate.month) || (date.year == parameters.maximumDate.year && date.month == parameters.maximumDate.month  && date.date > parameters.maximumDate.date))
					{
						result.validated = false;
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		},
				
		informAboutDate: function (date, action, texts, parameters, eventTrigger)
		{
			var result =
			{
				informed: false,
				feedbackMessage: ''
			};
			
			var variables = {};
			var feedbackMessageGrammaticalNumberFormQuantity = 0;
			var noTexts = texts == '' || XXX_Type.isEmptyArray(texts);
			var useDefaultTexts = noTexts && texts !== false;
			
			var existingDate = XXX_TimestampHelpers.isExistingDate(date.year, date.month, date.date);
			
			switch (action)
			{
				case 'dateOfBirthYearAge':
					if (existingDate)
					{
						var dateOfBirthYearAge = XXX_TimestampHelpers.getDateOfBirthYearAge(date.year, date.month, date.date);
						
						if (dateOfBirthYearAge > 0)
						{
							variables.dateOfBirthYearAge = dateOfBirthYearAge;
							result.informed = true;
							
							if (useDefaultTexts)
							{
								texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'information', 'dateOfBirthYearAge');
							}
						}
					}
					break;
				case 'dayOfTheWeek':
					if (existingDate)
					{
						var timestamp = new XXX_Timestamp({year: date.year, month: date.month, date: date.date, hour: 0, minute: 0, second: 0});
						
						var timestampParts = timestamp.parse();
						
						var dayOfTheWeek = XXX_I18n_Translation.get('dateTime', 'daysOfTheWeek', 'names')[timestampParts.dayOfTheWeek - 1];
						
						variables.dayOfTheWeek = dayOfTheWeek;
						result.informed = true;
						
						if (useDefaultTexts)
						{
							texts = XXX_I18n_Translation.get('input', 'actions', 'date', 'information', 'dayOfTheWeek');
						}
					}
					break;
			}
			
			if (!(texts == false || texts == '' || XXX_Type.isEmptyArray(texts)))
			{
				result.feedbackMessage = XXX_I18n_Translation.composeVariableText(texts, variables, feedbackMessageGrammaticalNumberFormQuantity);
			}
			
			return result;
		}
		
		
};