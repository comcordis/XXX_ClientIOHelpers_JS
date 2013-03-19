/*jslint browser: true, devel: true, bitwise: true, eqeq: true, evil: true, plusplus: true, regexp: true, white: true, indent: 4, maxerr: 1000, maxlen: 500 */
/*jshint white:false smarttabs:true multistr:true evil:true asi:true immed:true browser:true devel:true maxerr:1000 */

var XXX_HTTPServer_Client_Input =
{
	profiles: {},
	
	addProfile: function (name, profile)
	{
		var defaultProfile = this.profiles.default;
		
		profile = XXX_Array.merge(defaultProfile, profile);
		
		this.profiles[name] = profile;
	},
	
	getLimitsProfileMaximumFileSize: function (limitsProfile)
	{
		return this.profiles[limitsProfile].maximumFileSize;
	},
			
	getLimitsProfileAcceptFileMIMETypes: function (limitsProfile)
	{
		return this.profiles[limitsProfile].acceptFileMIMETypes;
	},
	
	filterFileUploadsWithEffectiveHTTPServer_Client_Input_Limits: function (fileUploads, customHTTPServer_Client_Input_Limits)
	{
		var filteredFileUploads = {};
		
			var failedFiles = [];
			var uploadedFiles = [];
			
			var fileTotal = 0;
			var failedFileTotal = 0;
			var uploadedFileTotal = 0;
			
			var fileSizeTotal = 0;
			var failedFileSizeTotal = 0;
			var uploadedFileSizeTotal = 0;
			
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(fileUploads.files.uploaded); i < iEnd; ++i)
			{
				var uploadedFile = fileUploads.files.uploaded[i];
				
				var valid = true;
				
				if (valid)
				{
					if (!customHTTPServer_Client_Input_Limits.acceptFileUpload)
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'unacceptedFileUpload');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (XXX_Type.isPositiveInteger(customHTTPServer_Client_Input_Limits.minimumFileSize) && !XXX_Client_Input.validateMinimumFileSize(customHTTPServer_Client_Input_Limits.minimumFileSize, uploadedFile.size))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'underMinimumFileSize');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (XXX_Type.isPositiveInteger(customHTTPServer_Client_Input_Limits.maximumFileSize) && !XXX_Client_Input.validateMaximumFileSize(customHTTPServer_Client_Input_Limits.maximumFileSize, uploadedFile.size))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'exceedsMaximumFileSize');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (XXX_Type.isPositiveInteger(customHTTPServer_Client_Input_Limits.maximumFileTotal) && !XXX_Client_Input.validateMaximumFileTotal(customHTTPServer_Client_Input_Limits.maximumFileTotal, (fileTotal + 1)))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'exceedsMaximumFileTotal');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (!customHTTPServer_Client_Input_Limits.anonymous && XXX_Type.isFilledArray(customHTTPServer_Client_Input_Limits.accountClientInputLimits) && XXX_Type.isPositiveInteger(customHTTPServer_Client_Input_Limits.accountClientInputLimits.space.capacity) && customHTTPServer_Client_Input_Limits.accountClientInputLimits.space.capacity > 0 && !XXX_Client_Input.validateFreeAccountStorageSpace(customHTTPServer_Client_Input_Limits.accountClientInputLimits.space.free, (uploadedFileSizeTotal + uploadedFile.size)))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'exceedsFreeAccountStorageSpace');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (customHTTPServer_Client_Input_Limits.anonymous && !customHTTPServer_Client_Input_Limits.acceptAnonymousFileUpload)
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'unacceptedAnonymousFileUpload');
						
						valid = false;
					}
				}
				
				if (valid)
				{
					if (XXX_Type.isPositiveInteger(customHTTPServer_Client_Input_Limits.maximumFileSizeTotal) && !XXX_Client_Input.validateMaximumFileSizeTotal(customHTTPServer_Client_Input_Limits.maximumFileSizeTotal, (uploadedFileSizeTotal + uploadedFile.size)))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'exceedsMaximumFileSizeTotal');
						
						valid = false;									
					}
				}
				
				if (valid)
				{
					if (!customHTTPServer_Client_Input_Limits.acceptAnyFileExtension && !XXX_Client_Input.validateFileExtension(customHTTPServer_Client_Input_Limits.acceptFileExtensions, uploadedFile.extension))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'unacceptedFileExtension');
						
						valid = false;
					}
				}
				
				if (valid)
				{
					if (!customHTTPServer_Client_Input_Limits.acceptAnyFileMIMEType && !XXX_Client_Input.validateFileMIMEType(customHTTPServer_Client_Input_Limits.acceptFileMIMETypes, uploadedFile.mimeType))
					{
						uploadedFile.error = XXX_I18n_Translation.get('HTTPServer_Client_Input', 'errors', 'unacceptedFileMIMEType');
						
						valid = false;
					}
				}
				
				++fileTotal;
				fileSizeTotal += uploadedFile.size;
				
				if (!valid)
				{
					++failedFileTotal;
					failedFileSizeTotal += uploadedFile.size;
										
					failedFiles.push(uploadedFile);
				}
				else
				{
					++uploadedFileTotal;
					uploadedFileSizeTotal += uploadedFile.size;
					
					uploadedFiles.push(uploadedFile);
				}
			}
			
			for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(fileUploads.files.failed); i < iEnd; ++i)
			{
				var failedFile = fileUploads.files.failed[i];

				++fileTotal;
				fileSizeTotal += failedFile.size;
				
				++failedFileTotal;
				failedFileSizeTotal += failedFile.size;
				
				failedFiles.push(failedFile);
			}
			
		filteredFileUploads =
		{
			files:
			{
				uploaded: uploadedFiles,
				failed: failedFiles
			},
			
			fileTotal: fileTotal,
			failedFileTotal: failedFileTotal,
			uploadedFileTotal: uploadedFileTotal,
			
			fileSizeTotal: fileSizeTotal,
			failedFileSizeTotal: failedFileSizeTotal,
			uploadedFileSizeTotal: uploadedFileSizeTotal,
			
			manipulated: fileUploads.manipulated,
			
			withinRequestBodyLimits: fileUploads.withinRequestBodyLimits,
			error: fileUploads.error
		};
		
		return filteredFileUploads;
	},
	
	composeEffectiveHTTPServer_Client_Input_Limits: function (HTTPServer_Client_Input_LimitsProfile, accountClientInputLimits, submitAsynchronous)
	{
		if (HTTPServer_Client_Input_LimitsProfile == '')
		{
			HTTPServer_Client_Input_LimitsProfile = 'default';
		}
		
		if (!XXX_Array.hasKey(this.profiles, HTTPServer_Client_Input_LimitsProfile))
		{
			HTTPServer_Client_Input_LimitsProfile = 'default';
		}
		
		if (XXX_Type.isEmptyArray(accountClientInputLimits))
		{
			accountClientInputLimits = XXX_Account_ClientInput.getLimits();
		}
		
		var anonymous = true;
		
		var acceptFileUpload = false;
		var acceptAnonymousFileUpload = false;
				
		var minimumFileSize = 0;
		var maximumFileSize = 0;
		
		var maximumFileTotal = 0;
		
		var maximumFileSizeTotal = 0;
		
		var maximumRequestSize = 0;
		
		var maximumInputTime = 0;
		
		var acceptFileExtensions = [];
		var acceptAnyFileExtension = false;
		var acceptFileMIMETypes = [];
		var acceptAnyFileMIMEType = false;
		
		var scanLiveWithAntiVirus = true;
				
		var profile = HTTPServer_Client_Input_LimitsProfile;
		
		var disabledReason = false;
		
		// Determine the most restrictive limits (server configuration or profile)
		
			if (XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()])
			{
				acceptFileUpload = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].acceptFileUpload;
				
				acceptAnonymousFileUpload = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].acceptAnonymousFileUpload;
				
				minimumFileSize = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].minimumFileSize;
				maximumFileSize = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].maximumFileSize;
				
				maximumFileTotal = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].maximumFileTotal;
				
				maximumFileSizeTotal = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].maximumFileSizeTotal;
				
				maximumRequestSize = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].maximumRequestSize;
				
				maximumInputTime = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].maximumInputTime;
				
				acceptFileExtensions = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].acceptFileExtensions;
				
				acceptFileMIMETypes = XXX_PHP.HTTPServer_Client_Input_Limits[XXX_Domain.getEntryPoint()].acceptFileMIMETypes;
				
				disabledReason = 'HTTPServer_Client_Input_Limits_' + XXX_Domain.getEntryPoint();
			}
			
			if (submitAsynchronous && XXX_PHP.HTTPServer_Client_Input_Limits.upload)
			{
				acceptFileUpload = XXX_PHP.HTTPServer_Client_Input_Limits.upload.acceptFileUpload;
				
				acceptAnonymousFileUpload = XXX_PHP.HTTPServer_Client_Input_Limits.upload.acceptAnonymousFileUpload;
				
				minimumFileSize = XXX_PHP.HTTPServer_Client_Input_Limits.upload.minimumFileSize;
				maximumFileSize = XXX_PHP.HTTPServer_Client_Input_Limits.upload.maximumFileSize;
				
				maximumFileTotal = XXX_PHP.HTTPServer_Client_Input_Limits.upload.maximumFileTotal;
				
				maximumFileSizeTotal = XXX_PHP.HTTPServer_Client_Input_Limits.upload.maximumFileSizeTotal;
				
				maximumRequestSize = XXX_PHP.HTTPServer_Client_Input_Limits.upload.maximumRequestSize;
				
				maximumInputTime = XXX_PHP.HTTPServer_Client_Input_Limits.upload.maximumInputTime;
				
				acceptFileExtensions = XXX_PHP.HTTPServer_Client_Input_Limits.upload.acceptFileExtensions;
				
				acceptFileMIMETypes = XXX_PHP.HTTPServer_Client_Input_Limits.upload.acceptFileMIMETypes;
				
				disabledReason = 'HTTPServer_Client_Input_Limits_upload';
			}
			
			HTTPServer_Client_Input_LimitsProfile = this.profiles[HTTPServer_Client_Input_LimitsProfile];
			
			if (XXX_Type.isBoolean(HTTPServer_Client_Input_LimitsProfile.acceptFileUpload) && acceptFileUpload && !HTTPServer_Client_Input_LimitsProfile.acceptFileUpload)
			{
				acceptFileUpload = HTTPServer_Client_Input_LimitsProfile.acceptFileUpload; 
								
				disabledReason = 'HTTPServer_Client_Input_LimitsProfile';
			}
			
			if (XXX_Type.isBoolean(HTTPServer_Client_Input_LimitsProfile.acceptAnonymousFileUpload) && acceptAnonymousFileUpload && !HTTPServer_Client_Input_LimitsProfile.acceptAnonymousFileUpload)
			{
				acceptAnonymousFileUpload = HTTPServer_Client_Input_LimitsProfile.acceptAnonymousFileUpload;
			}		
			
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.minimumFileSize))
			{
				minimumFileSize = HTTPServer_Client_Input_LimitsProfile.minimumFileSize;
			}
			
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.maximumFileSize) && HTTPServer_Client_Input_LimitsProfile.maximumFileSize <= maximumFileSize)
			{
				maximumFileSize = HTTPServer_Client_Input_LimitsProfile.maximumFileSize;
			}
						
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.maximumFileTotal) && HTTPServer_Client_Input_LimitsProfile.maximumFileTotal <= maximumFileTotal)
			{
				maximumFileTotal = HTTPServer_Client_Input_LimitsProfile.maximumFileTotal;
			}
			
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.maximumFileSizeTotal) && HTTPServer_Client_Input_LimitsProfile.maximumFileSizeTotal <= maximumFileSizeTotal)
			{
				maximumFileSizeTotal = HTTPServer_Client_Input_LimitsProfile.maximumFileSizeTotal;
			}
			
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.maximumRequestSize) && HTTPServer_Client_Input_LimitsProfile.maximumRequestSize <= maximumRequestSize)
			{
				maximumRequestSize = HTTPServer_Client_Input_LimitsProfile.maximumRequestSize;
			}
			
			if (XXX_Type.isPositiveInteger(HTTPServer_Client_Input_LimitsProfile.maximumInputTime) && HTTPServer_Client_Input_LimitsProfile.maximumInputTime <= maximumInputTime)
			{
				maximumInputTime = HTTPServer_Client_Input_LimitsProfile.maximumInputTime;
			}
			
			if (XXX_Type.isBoolean(HTTPServer_Client_Input_LimitsProfile.scanLiveWithAntiVirus) && scanLiveWithAntiVirus && !HTTPServer_Client_Input_LimitsProfile.scanLiveWithAntiVirus)
			{
				scanLiveWithAntiVirus = HTTPServer_Client_Input_LimitsProfile.scanLiveWithAntiVirus;
			}
			
		// Account client input limits
		
			if (XXX_Type.isArray(accountClientInputLimits) && accountClientInputLimits.user_ID > 0)
			{
				anonymous = false;
				
				if (accountClientInputLimits.space.used > accountClientInputLimits.space.capacity)
				{
					accountClientInputLimits.space.used = accountClientInputLimits.space.capacity;
				}
				
				accountClientInputLimits.space.free = accountClientInputLimits.space.capacity - accountClientInputLimits.space.used;
				
				if (maximumFileSizeTotal > accountClientInputLimits.space.free)
				{
					maximumFileSizeTotal = accountClientInputLimits.space.free;
				}
				
				if (maximumFileSize > accountClientInputLimits.space.free)
				{
					maximumFileSize = accountClientInputLimits.space.free;
				}
				
				if (accountClientInputLimits.space.free <= 0)
				{
					acceptFileUpload = false; 
					
					disabledReason = 'noFreeSpaceInAccount';
				}
			}
			else if (!acceptAnonymousFileUpload)
			{
				acceptFileUpload = false;
				
				disabledReason = 'notAnonymous';
			}
		
		// Accept file upload
		
			if (acceptFileUpload)
			{			
				// Nothing allowed
				if (XXX_Array.getFirstLevelItemTotal(acceptFileExtensions) === 0 || (XXX_Array.getFirstLevelItemTotal(acceptFileExtensions) === 1 && acceptFileExtensions[0] == ''))
				{
					acceptFileUpload = false;
					
					disabledReason = 'noFileExtensions';
				}
				// All allowed, see if HTTPServer_Client_Input_LimitsProfile is more specific
				else if (XXX_Type.isArray(acceptFileExtensions) && XXX_Array.getFirstLevelItemTotal(acceptFileExtensions) === 1 && acceptFileExtensions[0] === '*')
				{				
					if (XXX_Type.isArray(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions))
					{
						// Nothing allowed
						if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 0 || (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[0] == ''))
						{
							acceptFileExtensions = [];
							
							acceptFileUpload = false;
							
							disabledReason = 'noFileExtensions';
						}
						// The same
						else if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[0] === '*')
						{
						}
						// More specific
						else
						{
							acceptFileExtensions = HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions;
						}
					}
				}
				// Specific
				else
				{
					if (XXX_Type.isArray(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions))
					{
						// Nothing allowed
						if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 0 || (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[0] == ''))
						{
							acceptFileExtensions = [];
							
							acceptFileUpload = false;
							
							disabledReason = 'noFileExtensions';
							
						}
						// Only accept the limited ones
						else if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[0] === '*')
						{
						}
						// Filter those within limited ones
						else
						{
							var temp = [];
							
							for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions); i < iEnd; ++i)
							{
								if (XXX_Client_Input.validateFileExtension(acceptFileExtensions, HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[i]))
								{
									temp.push(HTTPServer_Client_Input_LimitsProfile.acceptFileExtensions[i]);
								}
							}
							
							acceptFileExtensions = temp;
						}
					}
				}
			}
			else
			{
				acceptFileExtensions = [];
			}
			
			if (XXX_Type.isArray(acceptFileExtensions) && XXX_Array.getFirstLevelItemTotal(acceptFileExtensions) === 1 && acceptFileExtensions[0] === '*')
			{
				acceptAnyFileExtension = true;
			}
		
		// Accept file mime types
		
			if (acceptFileUpload)
			{
				// Nothing allowed
				if (XXX_Array.getFirstLevelItemTotal(acceptFileMIMETypes) == 0 || (XXX_Array.getFirstLevelItemTotal(acceptFileMIMETypes) === 1 && acceptFileMIMETypes[0] == ''))
				{
					acceptFileUpload = false;
					
					disabledReason = 'noFileMIMETypes';
				}
				// All allowed, see if HTTPServer_Client_Input_LimitsProfile is more specific
				else if (XXX_Type.isArray(acceptFileMIMETypes) && XXX_Array.getFirstLevelItemTotal(acceptFileMIMETypes) === 1 && acceptFileMIMETypes[0] === '*/*')
				{				
					if (XXX_Type.isArray(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes))
					{
						// Nothing allowed
						if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 0 || (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[0] == ''))
						{
							acceptFileMIMETypes = [];
								
							acceptFileUpload = false;
							
							disabledReason = 'noFileMIMETypes';
						}
						// The same
						else if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[0] == '*/*')
						{
						}
						// More specific
						else
						{
							acceptFileMIMETypes = HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes;
						}
					}
				}
				// Specific
				else
				{
					if (XXX_Type.isArray(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes))
					{
						// Nothing allowed
						if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 0 || (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[0] == ''))
						{
							acceptFileMIMETypes = [];
							
							acceptFileUpload = false;
							
							disabledReason = 'noFileMIMETypes';
						}
						// Only accept the limited ones
						else if (XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes) === 1 && HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[0] === '*/*')
						{
						}
						// Filter those within limited ones
						else
						{
							var temp = [];
							
							for (var i = 0, iEnd = XXX_Array.getFirstLevelItemTotal(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes); i < iEnd; ++i)
							{
								if (XXX_Client_Input.validateFileMIMEType(acceptFileMIMETypes, HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[i]))
								{
									temp.push(HTTPServer_Client_Input_LimitsProfile.acceptFileMIMETypes[i]);
								}
							}
							
							acceptFileMIMETypes = temp;
						}
					}
				}
			}
			else
			{
				acceptFileMIMETypes = [];
			}
					
			if (XXX_Type.isArray(acceptFileMIMETypes) && XXX_Array.getFirstLevelItemTotal(acceptFileMIMETypes) === 1 && acceptFileMIMETypes[0] === '*/*')
			{
				acceptAnyFileMIMEType = true;
			}
		
		// Last correction
		
			if (acceptFileUpload)
			{
				if (maximumFileSize > maximumFileSizeTotal)
				{
					maximumFileSize = maximumFileSizeTotal;
				}
				
				if (minimumFileSize < 0)
				{
					minimumFileSize = 0;
				}
				else if (minimumFileSize > maximumFileSize)
				{
					minimumFileSize = maximumFileSize;
				}
				
				if (minimumFileSize * maximumFileTotal > maximumFileSizeTotal)
				{
					maximumFileTotal = XXX_Number.floor(maximumFileSizeTotal / minimumFileSize);
				}
				
				if (maximumFileSize * maximumFileTotal < maximumFileSizeTotal)
				{
					maximumFileSizeTotal = maximumFileSize * maximumFileTotal;
				}
				
				if (XXX_HTTP_Browser.operatingSystem == 'iOS')		
				{
					acceptFileUpload = false;
					
					disabledReason = 'iOSDoesNotSupportFileUploadInput';
				}
				else if (maximumFileSizeTotal == 0)
				{
					acceptFileUpload = false;
					
					disabledReason = 'noMaximumFileSizeTotal';
				}
				else if (maximumFileSize == 0)
				{
					acceptFileUpload = false;
					
					disabledReason = 'noMaximumFileSize';
				}
				else if (maximumFileTotal == 0)
				{
					acceptFileUpload = false;
					
					disabledReason = 'noMaximumFileTotal';
				}
			}
			
			if (!acceptFileUpload)
			{
				minimumFileSize = 0;
				maximumFileSize = 0;
				
				maximumFileTotal = 0;
			
				maximumFileSizeTotal = 0;
				
				acceptAnonymousFileUpload = false;
				
				acceptFileExtensions = [];
				acceptAnyFileExtension = false;
				acceptFileMIMETypes = [];
				acceptAnyFileMIMEType = false;
			}
			else
			{
				disabledReason = false;
			}
					
		var limits = 
		{
			anonymous: anonymous,
			
			acceptFileUpload: acceptFileUpload,
			acceptAnonymousFileUpload: acceptAnonymousFileUpload,
			
			minimumFileSize: minimumFileSize,
			maximumFileSize: maximumFileSize,
			
			maximumFileTotal: maximumFileTotal,
			
			maximumFileSizeTotal: maximumFileSizeTotal,
			
			maximumRequestSize: maximumRequestSize,
			
			maximumInputTime: maximumInputTime,
			
			acceptFileExtensions: acceptFileExtensions,
			acceptAnyFileExtension: acceptAnyFileExtension,
			acceptFileMIMETypes: acceptFileMIMETypes,
			acceptAnyFileMIMEType: acceptAnyFileMIMEType,
			
			scanLiveWithAntiVirus: scanLiveWithAntiVirus,
			
			accountClientInputLimits: accountClientInputLimits,
			
			profile: profile,
			
			disabledReason: disabledReason
		};
		
		return limits;
	}
};